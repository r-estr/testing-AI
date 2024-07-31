import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import replace from 'replace';

export default class AIEngine {

  async ai_engine() {
    const csvFilePath = await path.resolve(`${process.cwd()}/tests/csv_files`, process.env.FILE as string);

    const headers = ['TC_Reference', 'TC_description', 'Expected_outcome', 'Actual_outcome', 'Action', 'Test_Data', 'Test_Spec_FileName', 'Tag', 'Page_Objects_File_Name', 'Parent_Folder_Name', 'Element_Name', 'Locator_Type', 'Role', 'Element_Locator'];

    const fileContent = await fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    await parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, (error, result) => {
      if (error) {
        console.error(error);
      }
      console.log(result);

      console.log("Start Write")

      // fs.writeFileSync(path.resolve(`${process.cwd()}/tests/pageobjects`, result[1].Page_Objects_File_Name), "test", {
      //   flag: "w"
      // })

      if (!fs.existsSync(result[1].Parent_Folder_Name)) {
        fs.mkdirSync(path.resolve(`${process.cwd()}/tests/${result[1].Parent_Folder_Name}`), { recursive: true });
      }

      fs.writeFileSync(path.resolve(`${process.cwd()}/tests/${result[1].Parent_Folder_Name}`, result[1].Test_Spec_FileName), '', {
        flag: "w"
      })

      this.spec_writer(result)

      console.log("End Write")
    });
  };

  async spec_writer(result) {
    let template = await fs.readFileSync(`${process.cwd()}/tests/ai-engine/spec_template.txt`, { encoding: 'utf-8' });
    await fs.appendFileSync(`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`, template)

    let steps = '';

    for (let i = 1; i < result.length; i++) {
      if (await result[i].Action == 'goto') {
        steps = steps + `\nawait page.goto('${result[i].Test_Data}');\n`
      }
      if (await result[i].Action == 'fill') {
        if (await result[i].Locator_Type == 'testId') {
          steps = steps + `\nawait page.getByTestId('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'label') {
          steps = steps + `\nawait page.getByLabel('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'role') {
          steps = steps + `\nawait page.getByRole('${result[i].Role}', {name : '${result[i].Element_Locator}'}).fill('${result[i].Test_Data}');\n`
        }
      }
      if (await result[i].Action == 'click') {
        if (await result[i].Locator_Type == 'testId') {
          steps = steps + `\nawait page.getByTestId('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'label') {
          steps = steps + `\nawait page.getByLabel('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'role') {
          steps = steps + `\nawait page.getByRole('${result[i].Role}', {name : '${result[i].Element_Locator}'}).click();\n`
        }
      }
    }

    replace({
      regex: "TC_NAME",
      replacement: result[1].TC_Reference,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });


    replace({
      regex: "TAG",
      replacement: result[1].Tag,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });


    replace({
      regex: "STEPS",
      replacement: steps,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });

  }

}