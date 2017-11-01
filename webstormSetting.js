/**
 * Created by gaoletian on 17/10/24.
 */
const fs = require('fs')
const settingPath = './.idea/workspace.xml'
const jestDefaultSetting = `    <configuration default="true" type="JavaScriptTestRunnerJest" factoryName="Jest">
      <node-interpreter value="project" />
      <working-dir value="" />
      <jest-options value="--env node --bail --runInBand" />
      <envs>
        <env name="NODE_ENV" value="dev" />
      </envs>
      <scope-kind value="ALL" />
      <method />
    </configuration>`
const jestReg = /<configuration default="true" type="JavaScriptTestRunnerJest" factoryName="Jest">\n(.|\n)*?<\/configuration>/mg

const res = fs.readFileSync(settingPath).toString()
fs.writeFileSync(settingPath, res.replace(jestReg, jestDefaultSetting))

const re = res.match(jestReg)
console.log(re)