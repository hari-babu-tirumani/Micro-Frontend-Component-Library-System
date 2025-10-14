# Email Campaign Testing Dashboard

A professional web application for validating and testing email HTML templates. Built for marketing tech teams to ensure email campaigns meet quality standards before deployment.

## Features

### Core Validation Checks
- **HTML Validation**: Ensures proper HTML5 structure
- **Alt Tag Detection**: Verifies all images have accessibility alt attributes
- **Inline CSS Analysis**: Confirms inline styles are present (required for email clients)
- **Responsive Design Check**: Detects media queries for mobile responsiveness

### Screenshot Automation
- Automated viewport testing with Selenium
- Captures previews in Desktop (1200x800), Tablet (768x1024), and Mobile (375x667)
- Simulates how emails appear across different devices

### Report Management
- Timestamped test reports stored as JSON
- Historical report viewing
- Color-coded pass/fail indicators
- Report persistence for auditing

## Installation

### Prerequisites
- Python 3.8+
- Chrome/Chromium browser (for screenshot feature)
- ChromeDriver (for screenshot feature)

### Setup

1. **Clone or navigate to the project directory**

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Install ChromeDriver (for screenshot feature)**

**macOS (using Homebrew):**
```bash
brew install chromedriver
```

**Ubuntu/Debian:**
```bash
sudo apt-get install chromium-chromedriver
```

**Windows:**
Download from https://chromedriver.chromium.org/ and add to PATH

4. **Run the application**
```bash
python app.py
```

5. **Access the dashboard**
Open your browser and navigate to: `http://localhost:5000`

## Usage

### Testing an Email Template

1. **Upload Template**: Click or drag-and-drop an HTML email template file
2. **Enable Screenshots** (optional): Check the box to generate client preview screenshots
3. **Run Tests**: Click "Run Tests" button
4. **Review Results**: View color-coded validation results:
   - ✓ Green = Pass
   - ✗ Red = Fail

### Understanding Results

**HTML Validation**
- Checks for proper HTML structure
- Identifies missing tags or malformed markup

**Image Alt Tags**
- Counts total images vs images with alt attributes
- Critical for accessibility and spam filtering

**Inline CSS**
- Verifies presence of inline styles
- Email clients strip external stylesheets

**Responsive Design**
- Detects @media queries
- Ensures mobile compatibility

### Viewing Historical Reports

- Recent reports appear at the bottom of the dashboard
- Each report shows filename, timestamp, and pass/fail score
- Reports are stored in the `reports/` directory

## Project Structure

```
email-campaign-dashboard/
├── app.py                      # Flask application
├── email_validator.py          # Validation logic
├── screenshot_service.py       # Screenshot automation
├── requirements.txt            # Python dependencies
├── templates/
│   └── index.html             # Dashboard UI
├── static/
│   ├── css/
│   │   └── style.css          # Styles
│   └── screenshots/           # Generated screenshots
├── uploads/                    # Uploaded templates
└── reports/                    # Test reports (JSON)
```

## API Endpoints

- `GET /` - Dashboard homepage
- `POST /upload` - Upload and validate email template
- `GET /reports` - List all test reports
- `GET /reports/<report_id>` - Get specific report

## Configuration

Edit `app.py` to customize:

```python
app.config['UPLOAD_FOLDER'] = 'uploads'        # Upload directory
app.config['REPORT_FOLDER'] = 'reports'        # Report storage
app.config['SCREENSHOT_FOLDER'] = 'static/screenshots'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size
```

## Tips for Email Development

### Best Practices Checked by This Tool

1. **Always use inline CSS** - External stylesheets are stripped by most email clients
2. **Include alt tags** - Improves accessibility and helps avoid spam filters
3. **Use media queries** - Essential for responsive design on mobile devices
4. **Validate HTML** - Clean markup prevents rendering issues

### Common Email Client Quirks

- **Outlook**: Limited CSS support, use tables for layout
- **Gmail**: Strips `<style>` tags, inline CSS only
- **Apple Mail**: Best CSS support, but test on actual devices
- **Mobile**: Always test with actual screenshots

## Troubleshooting

**Screenshots not generating?**
- Ensure ChromeDriver is installed and in PATH
- Check Chrome/Chromium browser is installed
- Run with `--headless` mode (already configured)

**Upload fails?**
- Check file is valid HTML
- Verify file size is under 16MB
- Ensure `uploads/` directory has write permissions

**Reports not saving?**
- Verify `reports/` directory exists and has write permissions

## Development

To run in development mode:

```bash
export FLASK_ENV=development
python app.py
```

## License

This project is open source and available for use by marketing and development teams.

## Support

For issues or questions, please check the documentation or contact your development team.
