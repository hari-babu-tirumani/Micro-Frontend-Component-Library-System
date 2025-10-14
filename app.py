import os
import json
from datetime import datetime
from flask import Flask, render_template, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from email_validator import EmailValidator
from screenshot_service import ScreenshotService

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['REPORT_FOLDER'] = 'reports'
app.config['SCREENSHOT_FOLDER'] = 'static/screenshots'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

ALLOWED_EXTENSIONS = {'html'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'email_template' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['email_template']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename_with_timestamp = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename_with_timestamp)
        file.save(filepath)

        # Run validation checks
        with open(filepath, 'r', encoding='utf-8') as f:
            html_content = f.read()

        validator = EmailValidator()
        results = validator.validate(html_content)

        # Take screenshots if enabled
        take_screenshots = request.form.get('take_screenshots', 'false') == 'true'
        if take_screenshots:
            screenshot_service = ScreenshotService()
            screenshot_paths = screenshot_service.capture_screenshots(html_content, timestamp)
            results['screenshots'] = screenshot_paths

        # Save report
        report_filename = f"report_{timestamp}.json"
        report_path = os.path.join(app.config['REPORT_FOLDER'], report_filename)

        report_data = {
            'timestamp': timestamp,
            'filename': filename,
            'results': results
        }

        with open(report_path, 'w') as f:
            json.dump(report_data, f, indent=2)

        return jsonify({
            'success': True,
            'results': results,
            'report_id': timestamp
        })

    return jsonify({'error': 'Invalid file type. Only HTML files allowed.'}), 400

@app.route('/reports')
def list_reports():
    reports = []
    for filename in sorted(os.listdir(app.config['REPORT_FOLDER']), reverse=True):
        if filename.endswith('.json'):
            with open(os.path.join(app.config['REPORT_FOLDER'], filename), 'r') as f:
                report = json.load(f)
                reports.append(report)
    return jsonify(reports)

@app.route('/reports/<report_id>')
def get_report(report_id):
    report_path = os.path.join(app.config['REPORT_FOLDER'], f"report_{report_id}.json")
    if os.path.exists(report_path):
        with open(report_path, 'r') as f:
            return jsonify(json.load(f))
    return jsonify({'error': 'Report not found'}), 404

# Create necessary directories on startup
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['REPORT_FOLDER'], exist_ok=True)
os.makedirs(app.config['SCREENSHOT_FOLDER'], exist_ok=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
