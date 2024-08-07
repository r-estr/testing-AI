import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import replace from 'replace'

export default class AIEngine {

  async web_spec_creator() {
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

      console.log("------------------------------")
      console.log("Generating web spec started...")

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

      console.log("Web spec generation completed!")
      console.log("------------------------------")
    });
  };

  async spec_writer(result: any) {
    let template = await fs.readFileSync(`${process.cwd()}/tests/template/spec_template.txt`, { encoding: 'utf-8' });
    await fs.appendFileSync(`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`, template)

    let steps = '';

    for (let i = 1; i < result.length; i++) {
      if (await result[i].Action == 'goto') {
        console.log('Go to step created...');
        steps = steps + `\nawait page.goto('${result[i].Test_Data}');\n`
      }
      if (await result[i].Action == 'fill') {
        console.log('Fill step created...');
        if (await result[i].Locator_Type == 'testId') {
          steps = steps + `\nawait page.getByTestId('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'label') {
          steps = steps + `\nawait page.getByLabel('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'role') {
          steps = steps + `\nawait page.getByRole('${result[i].Role}', {name : '${result[i].Element_Locator}'}).fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'locator') {
          steps = steps + `\nawait page.locator('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'text') {
          steps = steps + `\nawait page.getByText('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
        if (await result[i].Locator_Type == 'altText') {
          steps = steps + `\nawait page.getByAltText('${result[i].Element_Locator}').fill('${result[i].Test_Data}');\n`
        }
      }
      if (await result[i].Action == 'click') {
        console.log('Click step created...');
        if (await result[i].Locator_Type == 'testId') {
          steps = steps + `\nawait page.getByTestId('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'label') {
          steps = steps + `\nawait page.getByLabel('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'role') {
          steps = steps + `\nawait page.getByRole('${result[i].Role}', {name : '${result[i].Element_Locator}'}).click();\n`
        }
        if (await result[i].Locator_Type == 'locator') {
          steps = steps + `\nawait page.locator('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'text') {
          steps = steps + `\nawait page.getByText('${result[i].Element_Locator}').click();\n`
        }
        if (await result[i].Locator_Type == 'altText') {
          steps = steps + `\nawait page.getByAltText('${result[i].Element_Locator}').click();\n`
        }
      }
    }

    await replace({
      regex: "TC_NAME",
      replacement: result[1].TC_Reference,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });


    await replace({
      regex: "TAG",
      replacement: result[1].Tag,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });


    await replace({
      regex: "STEPS",
      replacement: steps,
      paths: [`${process.cwd()}/tests/${result[1].Parent_Folder_Name}/${result[1].Test_Spec_FileName}`],
      recursive: true,
      silent: true,
    });

  }

  async api_spec_creator() {
    const csvFilePath = await path.resolve(`${process.cwd()}/tests/csv_files`, process.env.FILE as string);

    const headers = ['TC_Reference', 'Request_Type', 'API_URL', 'Response_Code', 'Authetication_Bearer_Token', 'Parameter', 'Request_Body', 'Response_Body', 'Test_Spec_FileName', 'Parent_Folder_Name', 'Tag'];

    const fileContent = await fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    await parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, (error, result) => {
      if (error) {
        console.error(error);
      }
      this.api_spec_writer(result)
    });
  }

  async api_spec_writer(result: any) {
    let template = await fs.readFileSync(`${process.cwd()}/tests/template/api_spec_template.txt`, { encoding: 'utf-8' });

    for (let i = 1; i < result.length; i++) {
      console.log("------------------------------")
      console.log("Generating api spec started...")

      console.log(`Writing ${result[i].Request_Type} request test...`)

      if (!fs.existsSync(result[i].Parent_Folder_Name)) {
        fs.mkdirSync(path.resolve(`${process.cwd()}/tests/${result[i].Parent_Folder_Name}`), { recursive: true });
      }

      fs.writeFileSync(path.resolve(`${process.cwd()}/tests/${result[i].Parent_Folder_Name}`, result[i].Test_Spec_FileName), '', {
        flag: "w"
      })
      fs.appendFileSync(`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`, template);

      let requestBody = "";
      let parameter = "";
      let responseBody = "";
      let api_url = result[i].API_URL;

      if (await result[i].Request_Body !== "") {
        console.log('Creating request body...');
        requestBody = `data: ${result[i].Request_Body},`
      }
      if (await result[i].Response_Body !== "") {
        console.log('Creating response body assertion...');
        responseBody = `
        apiResponse.body().then(body => {
            let expected = '${result[i].Response_Body.replace(/(\r\n|\n|\r)/gm, "")}';
            expect(body.toString().replace(/ +/g, "")).toEqual(expected.replace(/ +/g, ""));
        });`
      }
      if (await result[i].Parameter !== "") {
        console.log('Creating parameter...');
        api_url = api_url.replace("{", "${")
        parameter = `let ${result[i].Parameter};`
      }

      await replace({
        regex: "TC_NAME",
        replacement: result[i].TC_Reference,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "TAG",
        replacement: result[i].Tag,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "API_URL",
        replacement: api_url,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "REQUEST_TYPE",
        replacement: result[i].Request_Type,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "DATA",
        replacement: requestBody,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "PARAMETER",
        replacement: parameter,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      await replace({
        regex: "RESPONSE_BODY",
        replacement: responseBody,
        paths: [`${process.cwd()}/tests/${result[i].Parent_Folder_Name}/${result[i].Test_Spec_FileName}`],
        recursive: true,
        silent: true,
      });

      console.log("API spec generation completed!")
      console.log("------------------------------")
    }

  }

}