import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ISeverity } from './model/severity'
import { PageType } from './model/pageType'
import { IZeroDayPage } from './model/zeroDayPage'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
	<React.StrictMode>
		<App
			dependencyPageData={
				{
					id: 'XRAY-210300',
					cve: {
					  id: 'CVE-2022-22971',
					  cvssV2Score: '4.0',
					  cvssV2Vector: 'CVSS:2.0/AV:N/AC:L/Au:S/C:N/I:N/A:P',
					  cvssV3Score: '6.5',
					  cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
					  applicableData: { isApplicable: true, searchTarget: 'searchTarget-text', evidence: [{ reason: 'evidence', filePathEvidence: 'filePathEvidence', codeEvidence: 'codeEvidence' }, { reason: 'evidence', filePathEvidence: 'filePathEvidence', codeEvidence: 'codeEvidence' }] }
					},
					component: 'org.springframework:spring-core',
					watchName: [''],
					fixedVersion: ['123'],
					type: 'Maven',
					version: '2.5.6',
					infectedVersion: ['(,4.3.16)', '[5.0.0,5.0.5)'],
					severity: ISeverity.Critical,
					edited: '2022-11-23T17:41:22Z',
					summary: 'In spring framework versions prior to 5.3.20+ , 5.2.22+ and old unsupported versions, application with a STOMP over WebSocket endpoint is vulnerable to a denial of service attack by an authenticated user.',
					license: [{
						name: 'Apache-2.0'
					  }],
					references: [{
						url: 'https://security.netapp.com/advisory/ntap-20220616-0003/'
					  }, {
						url: 'https://tanzu.vmware.com/security/cve-2022-22971'
					  }, {
						url: 'https://www.oracle.com/security-alerts/cpujul2022.html'
					  }],
					extendedInformation: {
					  shortDescription: 'Insufficient error handling in Spring Framework STOMP endpoints can lead to denial of service by remote attackers',
					  fullDescription: '[Spring](https://spring.io/) is the most popular application development framework for enterprise Java. Millions of developers around the world use Spring Framework to create high performing, easily testable, and reusable code. The WebSocket protocol is one of the ways to make your application handle real-time messages. [STOMP](https://en.wikipedia.org/wiki/Streaming_Text_Oriented_Messaging_Protocol) is a subprotocol operating on top of the lower-level WebSocket.\r\n\r\nA network attacker can trigger an exception in Spring applications that enable STOMP over WebSocket, by calling the `CONNECT` STOMP command twice on the same session.\r\n\r\nExample of a vulnerable Spring configuration - \r\n```java\r\npackage com.example.messagingstompwebsocket;\r\n\r\nimport org.springframework.context.annotation.Configuration;\r\nimport org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;\r\nimport org.springframework.web.socket.config.annotation.StompEndpointRegistry;\r\nimport org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;\r\n\r\n@Configuration\r\n@EnableWebSocketMessageBroker\r\npublic class WebSocketConfig implements WebSocketMessageBrokerConfigurer {\r\n  @Override\r\n  public void registerStompEndpoints(StompEndpointRegistry registry) {\r\n    registry.addEndpoint("/gs-guide-websocket").withSockJS();\r\n  }\r\n}\r\n```',
					  remediation: undefined,
					  jfrogResearchSeverity: ISeverity.Critical,
					  jfrogResearchSeverityReason: [
							{
						  name: 'Exploitation of the issue is only possible when the vulnerable component is used in a specific manner. The attacker has to perform per-target research to determine the vulnerable attack vector.',
						  description: 'The Spring app must be running an endpoint that supports STOMP over WebSocket. This is enabled by calling the `StompEndpointRegistry.addEndpoint` API. The vulnerability can be exploited by unauthenticated attackers if no access restrictions are enforced on the endpoint.\r\n\r\nExample of a vulnerable endpoint -\r\n```java\r\npublic void registerStompEndpoints(StompEndpointRegistry registry) {\r\n  registry.addEndpoint("/some-endpoint-name").withSockJS();\r\n}\r\n```',
						  isPositive: true
							},
							{
						  name: 'The issue has an exploit published',
						  description: 'Test code demonstrates crashing a Spring web application',
						  isPositive: false
							},
							{
						  name: 'The issue can be exploited by attackers over the network',
						  description: 'When STOMP over WebSocket is enabled',
						  isPositive: false
							},
							{
						  name: 'The prerequisites for exploiting the issue are either extremely common or nonexistent (always exploitable)',
						  description: 'When STOMP over WebSocket is enabled, the vulnerability is exploitable under the default configuration',
						  isPositive: false
							}
					  ]
					},
					impactedPath: {
						// name: 'Black',
						// children: [{

						// 	name: 'Red',
						// 	children: [{
						// 		name: 'Scarlet',
						// 		children: []
						// 	}]
						// }, {
						// 	name: 'Red',
						// 	children: [{
						// 		name: 'Scarlet',
						// 		children: []
						// 	}]
						// }, {
						// 	name: 'Yellow',
						// 	children: []
						// }]

					  name: 'org.jfrog.test:multi:3.7-SNAPSHOT',
					  children: [{
						  name: 'org.jfrog.test:multi3:3.7-SNAPSHOT',
						  children: [{
							  name: 'org.jfrog.test:multi1:3.7-SNAPSHOT',
							  children: [{
								  name: 'org.springframework:spring-aop:2.5.6',
								  children: [{
									  name: 'org.springframework:spring-core:2.5.6',
									  children: []
									}]
								}]
							}]
						}, {
						  name: 'org.jfrog.test:multi1:3.7-SNAPSHOT',
						  children: [{
							  name: 'org.springframework:spring-aop:2.5.6',
							  children: [{
								  name: 'org.springframework:spring-core:2.5.6',
								  children: []
								}]
							}]
						}]
					}
				  }

			}
			zeroDayPageData={{ header: 'Path traversal', location: 'File_Name: 33', description: 'A user-controlled input was found to', remediation: ['step 1', 'step2'], foundText: 'aa', analysisStep: [{ file: 'java.java', line: '18:8' }, { file: 'py.y', line: '1:2' }] } as IZeroDayPage}
			PanelType={PageType.Dependency}/>
	</React.StrictMode>
)