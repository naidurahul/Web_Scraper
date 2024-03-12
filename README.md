## Reed Data Analyst Job Scraper - README

This project scrapes data analyst job listings from Reed.co.uk and saves them in a JSON file.

**Requirements:**

* Node.js and npm (or yarn) installed
* Puppeteer package (`npm install puppeteer`)

**Setup:**

1. Clone this repository or download the code files.
2. Install the required Puppeteer package:
   ```bash
   npm install puppeteer
   ```

**Running the Script:**

1. Open a terminal in the project directory.
2. Run the script using Node.js:
   ```bash
   node scrape.js
   ```

**Viewing the Data:**

1. The script will create a file named `jobs_data.json` in the project directory.
2. You can open this file in a text editor or use a JSON viewer to see the extracted job data. Each job listing will be represented as an object with details like title, job URL, salary, location, contract type, and job type.

**Explanation of the Script:**

* The script uses Puppeteer to launch a headless Chrome browser and navigate to Reed.co.uk's data analyst job search page.
* It iterates through paginated results, extracting job details from each listing using specific CSS selectors.
* Extracted data for each job is stored in an array.
* Finally, the script writes the entire array of job data objects as a formatted JSON string to the `jobs_data.json` file.

**Additional Notes:**

* This script relies on specific selectors for Reed.co.uk. These selectors might need adjustments if the website structure changes.
* Consider adding error handling mechanisms to catch potential issues during scraping.
* Debouncing might be necessary if the website implements rate limiting.


