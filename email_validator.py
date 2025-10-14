import re
from bs4 import BeautifulSoup
import html5lib

class EmailValidator:
    """Validates email HTML templates for best practices"""

    def __init__(self):
        self.results = {}

    def validate(self, html_content):
        """Run all validation checks on the HTML content"""
        self.results = {}

        # Parse HTML
        try:
            soup = BeautifulSoup(html_content, 'html5lib')
        except Exception as e:
            return {
                'html_valid': False,
                'html_errors': f"Failed to parse HTML: {str(e)}",
                'alt_tags_present': False,
                'inline_css_present': False,
                'media_queries_present': False
            }

        # Run validation checks
        self._validate_html(html_content, soup)
        self._check_alt_tags(soup)
        self._check_inline_css(soup)
        self._check_media_queries(html_content)

        return self.results

    def _validate_html(self, html_content, soup):
        """Check if HTML is valid HTML5"""
        try:
            # Check for basic HTML structure
            has_html_tag = soup.find('html') is not None
            has_head_tag = soup.find('head') is not None
            has_body_tag = soup.find('body') is not None

            # Check for doctype
            has_doctype = '<!DOCTYPE' in html_content or '<!doctype' in html_content

            is_valid = has_html_tag or has_body_tag  # Email templates may not always have full structure

            self.results['html_valid'] = is_valid

            if not is_valid:
                errors = []
                if not has_html_tag:
                    errors.append("Missing <html> tag")
                if not has_body_tag:
                    errors.append("Missing <body> tag")

                self.results['html_errors'] = "; ".join(errors)
            else:
                self.results['html_errors'] = None

        except Exception as e:
            self.results['html_valid'] = False
            self.results['html_errors'] = str(e)

    def _check_alt_tags(self, soup):
        """Check if all images have alt attributes"""
        images = soup.find_all('img')
        total_images = len(images)

        if total_images == 0:
            self.results['alt_tags_present'] = True
            self.results['total_images'] = 0
            self.results['missing_alt_count'] = 0
            return

        missing_alt = 0
        for img in images:
            if not img.get('alt'):
                missing_alt += 1

        self.results['total_images'] = total_images
        self.results['missing_alt_count'] = missing_alt
        self.results['alt_tags_present'] = missing_alt == 0

    def _check_inline_css(self, soup):
        """Check for inline CSS styles (required for email compatibility)"""
        # Find all elements with style attribute
        elements_with_style = soup.find_all(style=True)

        # Also check for style tags
        style_tags = soup.find_all('style')

        inline_css_count = len(elements_with_style)

        self.results['inline_css_count'] = inline_css_count
        self.results['style_tag_count'] = len(style_tags)
        self.results['inline_css_present'] = inline_css_count > 0

    def _check_media_queries(self, html_content):
        """Check for responsive design via media queries"""
        # Look for @media queries in style tags or inline styles
        media_query_pattern = r'@media[^{]+\{[^}]*\}'

        matches = re.findall(media_query_pattern, html_content, re.IGNORECASE | re.DOTALL)

        media_query_count = len(matches)

        self.results['media_query_count'] = media_query_count
        self.results['media_queries_present'] = media_query_count > 0

    def get_detailed_report(self):
        """Get a detailed text report of validation results"""
        report = []

        report.append("=" * 60)
        report.append("EMAIL TEMPLATE VALIDATION REPORT")
        report.append("=" * 60)

        # HTML Validation
        report.append("\n1. HTML Validation:")
        if self.results.get('html_valid'):
            report.append("   ✓ PASS - Valid HTML structure")
        else:
            report.append("   ✗ FAIL - Invalid HTML structure")
            if self.results.get('html_errors'):
                report.append(f"   Errors: {self.results['html_errors']}")

        # Alt Tags
        report.append("\n2. Image Alt Tags:")
        if self.results.get('alt_tags_present'):
            report.append(f"   ✓ PASS - All {self.results.get('total_images', 0)} images have alt tags")
        else:
            report.append(f"   ✗ FAIL - {self.results.get('missing_alt_count', 0)} of {self.results.get('total_images', 0)} images missing alt tags")

        # Inline CSS
        report.append("\n3. Inline CSS:")
        if self.results.get('inline_css_present'):
            report.append(f"   ✓ PASS - {self.results.get('inline_css_count', 0)} elements with inline styles")
        else:
            report.append("   ✗ FAIL - No inline CSS found (may not render properly in email clients)")

        # Media Queries
        report.append("\n4. Responsive Design:")
        if self.results.get('media_queries_present'):
            report.append(f"   ✓ PASS - {self.results.get('media_query_count', 0)} media queries found")
        else:
            report.append("   ⚠ WARNING - No media queries detected (template may not be responsive)")

        report.append("\n" + "=" * 60)

        return "\n".join(report)
