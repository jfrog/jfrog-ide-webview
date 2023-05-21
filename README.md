<div align="center">

# JFrog-IDE-Webview

[![JFrog-IDE-Webview-Extension-863x300-1](/images/logo.png)](/images/logo.png)
[![Webview Tests](https://github.com/jfrog/jfrog-ide-webview/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/jfrog/jfrog-ide-webview/actions/workflows/test.yml)
[![Scanned by Frogbot](https://raw.github.com/jfrog/frogbot/master/images/frogbot-badge.svg)](https://github.com/jfrog/frogbot#readme)
</div>

 🖥  A React-based HTML page designed to be seamlessly embedded within JFrog VS Code and IntelliJ Extensions. It serves as a powerful web view that offers a comprehensive overview of vulnerabilities identified in the source code project.

## Build

To build the project and generate the HTML page, follow these steps:

1. Install the required dependencies by running the following command:

   ```bash
   npm install
   ```

2. Build the project using the following command:

   ```bash
   npm run build
   ```

   This will generate the necessary artifacts, including the HTML page, in the build directory.

## Watch

The `watch` script enables you to automatically rebuild the project whenever changes are made to the source code. This is useful during development when you want to see immediate updates without manually triggering a build.

To start the watch mode, run the following command:

   ```bash
   npm run start
   ```

This will initiate the watch mode, and any changes made to the source code will trigger a rebuild. A browser window will also open automatically with the appropriate URL to view the code live.

During development, when you run the project in watch mode (`npm run start`), you can navigate between pages to view different content. Initially, you will see a page with the text "nothing to show". To navigate to the main page and view the desired content, follow these steps:

1. Open the 'Inspect' window by right-clicking on the page and selecting "Inspect" from the context menu.
2. In the Inspect window, navigate to the Console tab.

To view a specific page example, choose one of the following options and enter the corresponding code snippet in the Console:

<details>

<summary>Secret Page</summary>

```javascript
window.postMessage({
  "type": "SHOW_DATA",
  "pageData": {
    "header": "SQL Injection",
    "pageType": "SECRETS",
    "severity": "Critical",
    "location": "EXP-1527-00001",
  'description': '\n SQL injection \n    ',
    "abbreviation": "RES.KEY.API.ENCRYPT",
      'finding': {
   'snippet': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
   'meaning': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
   'happen': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
   'do': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud '
  }
  }
}, '*');
```

</details>

<details>

<summary>Dependency Page</summary>

```javascript
window.postMessage({
  "type": "SHOW_DATA",
  "pageData": {
 "id": "210300",
 "pageType": "DEPENDENCY",
 "cve": {
  "id": "71",
  "cvssV2Score": "4.0",
     "cvssV2Vector": "CV:N/I:N/A:P",
     "cvssV3Score": "6.5",
     "cvssV3Vector": "CVSS:3.1/A/A:H",
     "applicableData": { "isApplicable": true, "searchTarget": "searchTarget-text", "evidence": [
    {
     "reason": "evidence", "filePathEvidence": "filePathEvidence", "codeEvidence": "codeEvidence"
    }
   ]
  }
 },
    "component": "org.spre",
    "fixedVersion": [
  "123"
 ],
    "componentType": "Maven",
    "version": "2.5.6",
    "infectedVersion": [
  "(,4.36)",
  "[5.0.0,5.5)"
 ],
    "severity": "Critical",
    "edited": "2022-11-23T17:41:22Z",
    "summary": "Inicated user.",
    "license": [
  {
     "name": "Apache-2.0"
  }
 ],
    "references": [
  {
     "url": "https://security.netapp.com/advisory/ntap-20220616-0003/"
  }
 ],
    "extendedInformation": {
     "shortDescription": "Insufficient remote attackers",
     "fullDescription": "```[Spring](https://spring.io/) is_Text_OriebSocket.\r\n\r\nA network attacker can trigger an exception in S.withSockJS();\r\n  }\r\n}\r\n```",

     "jfrogResearchSeverity": "Critical",
     "jfrogResearchSeverityReason": [
   {
       "name": "Exploitatesearch to determine the vulnerable attack vector.",
       "description": "The Spring apppoint.\r\n\r\nExample of a vulnerable endpoint -\r\n```java\r\npublic void registerStompEndpoints(StompEndpointRegistry registry) {\r\n  registry.withSockJS();\r\n}\r\n```",
       "isPositive": true
   }
  ]
 },
 "impactGraph": {
  "name": "jfrog-idea-plugin",
  "children": [
   {
    "name": "com.fasterxml.jackson.dataformat:jackson-dataformat-yaml:2.14.0",
    "children": [
     {
      "name": "org.yaml:snakeyaml:1.33"
     }
    ]
   }
  ]
 }
}
}, '*');
```

</details>

## Run Tests

To run tests for the project, use the following command:

   ```bash
   npm test
   ```

This will execute the tests using Jest and provide the test results, including any failures or errors encountered.
