import os
import tempfile
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from PIL import Image

class ScreenshotService:
    """Service to capture screenshots of email templates in different viewport sizes"""

    def __init__(self):
        self.viewports = {
            'desktop': {'width': 1200, 'height': 800, 'name': 'Desktop (1200x800)'},
            'tablet': {'width': 768, 'height': 1024, 'name': 'Tablet (768x1024)'},
            'mobile': {'width': 375, 'height': 667, 'name': 'Mobile (375x667)'},
        }

    def capture_screenshots(self, html_content, timestamp):
        """
        Capture screenshots of the email template in different viewport sizes
        Returns a list of screenshot paths
        """
        screenshots = []

        try:
            # Setup Chrome options
            chrome_options = Options()
            chrome_options.add_argument('--headless')
            chrome_options.add_argument('--no-sandbox')
            chrome_options.add_argument('--disable-dev-shm-usage')
            chrome_options.add_argument('--disable-gpu')

            # Create a temporary HTML file
            with tempfile.NamedTemporaryFile(mode='w', suffix='.html', delete=False, encoding='utf-8') as f:
                f.write(html_content)
                temp_file = f.name

            try:
                # Initialize the driver
                driver = webdriver.Chrome(options=chrome_options)

                # Open the HTML file
                driver.get(f'file://{temp_file}')

                # Capture screenshots for each viewport
                for viewport_key, viewport in self.viewports.items():
                    try:
                        # Set window size
                        driver.set_window_size(viewport['width'], viewport['height'])

                        # Wait a moment for rendering
                        driver.implicitly_wait(1)

                        # Create screenshot filename
                        screenshot_filename = f"{timestamp}_{viewport_key}.png"
                        screenshot_path = os.path.join('static', 'screenshots', screenshot_filename)

                        # Ensure directory exists
                        os.makedirs(os.path.dirname(screenshot_path), exist_ok=True)

                        # Take screenshot
                        driver.save_screenshot(screenshot_path)

                        # Optimize the image
                        self._optimize_image(screenshot_path)

                        screenshots.append({
                            'name': viewport['name'],
                            'path': f'/static/screenshots/{screenshot_filename}',
                            'viewport': viewport_key
                        })

                    except Exception as e:
                        print(f"Error capturing {viewport_key} screenshot: {str(e)}")

            finally:
                # Clean up
                driver.quit()
                if os.path.exists(temp_file):
                    os.remove(temp_file)

        except Exception as e:
            print(f"Error setting up screenshot service: {str(e)}")
            # Return empty list if screenshots fail
            return []

        return screenshots

    def _optimize_image(self, image_path):
        """Optimize PNG image to reduce file size"""
        try:
            img = Image.open(image_path)

            # Convert RGBA to RGB if necessary
            if img.mode == 'RGBA':
                # Create a white background
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])  # 3 is the alpha channel
                img = background

            # Save with optimization
            img.save(image_path, 'PNG', optimize=True, quality=85)

        except Exception as e:
            print(f"Error optimizing image: {str(e)}")

    def cleanup_old_screenshots(self, days_old=7):
        """Remove screenshots older than specified days"""
        import time
        from datetime import datetime, timedelta

        screenshot_dir = os.path.join('static', 'screenshots')
        if not os.path.exists(screenshot_dir):
            return

        cutoff_time = time.time() - (days_old * 86400)

        for filename in os.listdir(screenshot_dir):
            filepath = os.path.join(screenshot_dir, filename)
            if os.path.isfile(filepath):
                file_modified = os.path.getmtime(filepath)
                if file_modified < cutoff_time:
                    try:
                        os.remove(filepath)
                        print(f"Removed old screenshot: {filename}")
                    except Exception as e:
                        print(f"Error removing {filename}: {str(e)}")
