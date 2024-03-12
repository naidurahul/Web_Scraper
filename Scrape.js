const puppeteer = require("puppeteer");
const fs = require("fs");


(async () => {
  const browser = await puppeteer.launch({});
  console.log("Starting the browser!!!");
  const page = await browser.newPage();

  let pageNumber = 1;
  let isLastPage = false;
  let all_job_data = [];

  while (!isLastPage) {
    const url = `https://www.reed.co.uk/jobs/data-analyst-jobs?pageno=${pageNumber}`;
    await page.goto(url);
    console.log(`Loading page ${pageNumber}`);

    await page.waitForSelector("article");

    const page_job_data = await page.$$eval("article", (articles) =>
      articles.map((article) => {
        const aTag = article.querySelector(
          ".job-card_jobCard__body__86jgk.card-body a"
        );
        const title = aTag ? aTag.textContent.trim() : null;
        const job_url = aTag ? aTag.href : null;

        const salary_li_tag = article.querySelector(
          ".job-card_jobMetadata__gjkG3.list-group.list-group-horizontal li"
        );
        const salary = salary_li_tag ? salary_li_tag.textContent.trim() : null;

        const location_li_tag = article.querySelector("header > ul > li:nth-child(2)");
        const location = location_li_tag ? location_li_tag.textContent.trim() : null;
        
        const contract_li_tag = article.querySelector("header > ul > li:nth-child(3)");
        const contract_type = contract_li_tag
          ? contract_li_tag.textContent.split(",")[0].trim()
          : null;

        const job_li_tag = article.querySelector("header > ul > li:nth-child(3)");
        const job_type = job_li_tag ? job_li_tag.textContent.split(",")[1].trim() : null;


        return { "Title":title, "Job Url": job_url, "Salary": salary, "Location": location, "Contract Type": contract_type, "Job Type": job_type};
      })
    );
    
    // Check for "Next" button existence and use a page navigation strategy
    const nextButton = await page.$("li.page-item a.page-link.next");
    const parentLiHandle = await nextButton.evaluateHandle(button => button.parentElement);
    const parentLiClassList = await parentLiHandle.evaluate(li => Array.from(li.classList));
    // Check if the parent <li> element has the "disabled" class in its class list
    const isParentDisabled = parentLiClassList.includes('disabled');
    isLastPage = !nextButton || isParentDisabled; // Last page if no "Next" button or parent <li> has "disabled" class

    all_job_data = [...all_job_data, ...page_job_data]
    if (!isLastPage) {
      await Promise.all([
        nextButton.click(),
      ]);
      pageNumber++;
    }
  }
  const outputPath = "jobs_data.json";
  fs.writeFileSync(outputPath, JSON.stringify(all_job_data, null, 2));
  console.log("JSON file written successfully");
  await browser.close();
})();

