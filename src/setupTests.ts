// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { Applicability, IDependencyPage, ISeverity, PageType } from './model'
import { MatcherFunction } from '@testing-library/react'

const fakeDependencyPage: IDependencyPage = {
	id: 'XRAY-210300',
	cve: {
		id: 'CVE-2022-22971',
		cvssV2Score: '4.0',
		cvssV2Vector: 'CVSS:2.0/AV:N/AC:L/Au:S/C:N/I:N/A:P',
		cvssV3Score: '6.5',
		cvssV3Vector: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:H',
		applicableData: {
			applicability: Applicability.APPLICABLE,
			searchTarget: 'search target',
			evidence: [
				{
					filePathEvidence: 'filePathEvidence',
					codeEvidence: 'codeEvidence',
					reason: 'applicable reason'
				}
			]
		}
	},
	component: 'org.springframework:spring-core',
	watchName: ['here-is-my-cool-new-watch', 'that-is-something-to-watch-out-for'],
	componentType: 'Maven',
	pageType: PageType.Dependency,
	version: '2.5.6',
	infectedVersion: ['(,4.3.16)', '[5.0.0,5.0.5)'],
	severity: ISeverity.Critical,
	edited: '2022-11-23T17:41:22Z',
	summary:
		'In spring framework versions prior to 5.3.20+ , 5.2.22+ and old unsupported versions, application with a STOMP over WebSocket endpoint is vulnerable to a denial of service attack by an authenticated user.',
	fixedVersion: ['[4.3.16]', '[5.0.5]'],
	license: [
		{
			name: 'Apache-2.0'
		}
	],
	references: [
		{
			url: 'https://security.netapp.com/advisory/ntap-20220616-0003/'
		},
		{
			url: 'https://tanzu.vmware.com/security/cve-2022-22971'
		},
		{
			url: 'https://www.oracle.com/security-alerts/cpujul2022.html'
		}
	],
	extendedInformation: {
		shortDescription: 'shortDescription-text',
		fullDescription: 'fullDescription-text',
		remediation: 'remediation-text',
		jfrogResearchSeverity: ISeverity.Critical,
		jfrogResearchSeverityReason: [
			{
				name: 'jfrogResearchSeverityReason-name-1',
				description: 'jfrogResearchSeverityReason-description-1',
				isPositive: true
			},
			{
				name: 'jfrogResearchSeverityReason-name-2',
				description: 'jfrogResearchSeverityReason-description-2',
				isPositive: false
			},
			{
				name: 'jfrogResearchSeverityReason-name-3',
				description: 'jfrogResearchSeverityReason-description-3',
				isPositive: false
			},
			{
				name: 'jfrogResearchSeverityReason-name-4',
				description: 'jfrogResearchSeverityReason-description-4',
				isPositive: false
			}
		]
	},
	impactGraph: {
		root: {
			name: 'org.jfrog.test:multi:3.7-SNAPSHOT',
			children: [
				{
					name: 'org.jfrog.test:multi3:3.7-SNAPSHOT',
					children: [
						{
							name: 'org.jfrog.test:multi1:3.7-SNAPSHOT',
							children: [
								{
									name: 'org.springframework:spring-aop:2.5.6',
									children: [
										{
											name: 'org.springframework:spring-core:2.5.6',
											children: []
										}
									]
								}
							]
						}
					]
				},
				{
					name: 'org.jfrog.test:multi1:3.7-SNAPSHOT',
					children: [
						{
							name: 'org.springframework:spring-aop:2.5.6',
							children: [
								{
									name: 'org.springframework:spring-core:2.5.6',
									children: []
								}
							]
						}
					]
				}
			]
		}
	}
} as IDependencyPage

// Returns a fake (but reasonable) DependencyPage object that can be used for testing
export const getFakeDependencyPage = (): IDependencyPage => fakeDependencyPage

/**
 * The *getByText and *getByLabelText can't find elements that are broken into multiple elements.
 * For example, given the following HTML, it wasn't possible to query for the text "Hello World".
 * <h3>Hello <span>World</span></h3>
 *
 * 'withMarkup' provide a function for your text matcher [...]".
 * The function gets called for each node you're rendering. It receives two arguments: the node's content and the node itself.
 * All you have to do is to return true or false depending on if the node is the one you want.
 *
 * We're ignoring the content argument because in this case, it will either be "Hello", "world" or an empty string according to the example.
 * What we are checking instead is that the current node has the right textContent. hasText is a little helper function to do that so it keeps things clean.
 *
 * That's not all though. Our div is not the only node with the text we're looking for.
 * For example, body in this case has the same text.
 * To avoid returning more nodes than needed we are making sure that none of the children has the same text as its parent.
 * In this way we're making sure that the node we're returning is the smallest—in other words the one closes to the bottom of our DOM tree.
 */
type Query = (f: MatcherFunction) => HTMLElement

const withMarkup =
	(query: Query) =>
	(text: string): HTMLElement =>
		query((content: string, node: Element | null) => {
			const hasText = (node: Element | null): boolean => node?.textContent === text
			const childrenDontHaveText = Array.from(node?.children ?? []).every(
				child => !hasText(child as HTMLElement)
			)
			return hasText(node) && childrenDontHaveText
		})

export default withMarkup
