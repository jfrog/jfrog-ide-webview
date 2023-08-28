<div align="center">

# JFrog-IDE-Webview

[![JFrog-IDE-Webview-Extension-863x300-1](/images/logo.png)](/images/logo.png)
[![Webview Tests](https://github.com/jfrog/jfrog-ide-webview/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/jfrog/jfrog-ide-webview/actions/workflows/test.yml)
[![Scanned by Frogbot](https://raw.github.com/jfrog/frogbot/master/images/frogbot-badge.svg)](https://github.com/jfrog/frogbot#readme)
</div>

## ℹ️ About This Project

The JFrog IDE integrations allow developers to find and fix security vulnerabilities in their projects and to see valuable information about the status of their code by continuously scanning it locally with JFrog Xray.\
**JFrog-IDE-Webview** is a React-based HTML page designed to be seamlessly embedded within [JFrog VS Code Extension](https://github.com/jfrog/jfrog-vscode-extension#readme) and the [JFrog IDEA Plugin](https://github.com/jfrog/jfrog-idea-plugin#readme). It serves as a powerful web view that offers a comprehensive overview of vulnerabilities identified in the source code project.

## 🚀 Build

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

## 🔍 Watch

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

<summary>Dependency Page</summary>

```javascript
window.postMessage({
  "type": "SHOW_PAGE",
  "data": {
    "id": "210300",
    "pageType": "DEPENDENCY",
    "cve": {
      "id": "71",
      "cvssV2Score": "4.0",
      "cvssV2Vector": "CV:N/I:N/A:P",
      "cvssV3Score": "6.5",
      "cvssV3Vector": "CVSS:3.1/A/A:H",
      "applicableData": {
        "isApplicable": true,
        "searchTarget": "searchTarget-text",
        "evidence": [
          {
            "reason": "evidence",
            "filePathEvidence": "filePathEvidence",
            "codeEvidence": "codeEvidence"
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
      root: {
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
      },
      pathsCount: 5,
      pathsLimit: 1
    }
  }
}, '*');
```

</details>

<details>

<summary>Secret Page</summary>

```javascript
window.postMessage({
  "type": "SHOW_PAGE",
  "data": {
     "header": "SQL Injection",
     "pageType": "SECRETS",
     "severity": "Critical",
     "location": "EXP-1527-00001",
     "description": "\n SQL injection \n    ",
     "abbreviation": "RES.KEY.API.ENCRYPT",
     "finding": {
     "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
     "meaning": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
     "happen": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ",
     "do": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
     }
  }
}, '*');
```

</details>

<details>

<summary>IaC Page</summary>

```javascript
window.postMessage({
  "type": "SHOW_PAGE",
   "data": {
     "header": "SQL Injection",
     "pageType": "IAC",
     "severity": "Critical",
     "id": "EXP-1527-00001",
     "abbreviation": "RES.KEY.API.ENCRYPT",
     "location": {
       "file": "/Users/assafa/Documents/code/flask-webgoat/flask_webgoat/__init__.py",
       "row": 14,
       "column": 15
     },
     "description": "\n SQL injection is a type of vulnerability that allows an attacker to execute arbitrary SQL\n    commands on a database.\n    This can allow the attacker to gain access to sensitive information, such as user credentials\n    or sensitive data, or to perform unauthorized actions, such as deleting or modifying data.\n\n    In this query we check if a user input can flow un-sanitized into the DB in order to do this.\n    ",
     "finding": {
       "snippet": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "meaning": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "happen": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
       "do": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
     }
    }
 }, '*');
```

</details>

## 🧪 Tests

To run tests for the project, use the following command:

   ```bash
   npm test
   ```

This will execute the tests using Jest and provide the test results, including any failures or errors encountered.

## 💻 Code Contributions

Contributions to the JFrog-IDE-Webview project are welcome and encouraged!.
Please follow these steps:

1. Fork the repository.
2. Create a new branch for your contribution.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a clear description of your changes.

We appreciate your contribution to making JFrog-IDE-Webview even better!
