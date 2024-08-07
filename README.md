# testing-AI

## Generating spec file from CSV

Run the command `FILE=<CSV_Filename> TEST=<API/WEB> npm run ai-engine` to generate spec file from your CSV
NOTE: if your file has spaces in between put it in a single quote e.g. `'sample csv file name.csv'`
Sample command: `FILE='sample csv file name.csv' TEST=web npm run ai-engine` or `FILE='sample csv file name.csv' TEST=api npm run ai-engine`

To run the test by file name run this command `npm run test <FileName>`

To run the test by tag name run this command `npm run tag @<tag>`