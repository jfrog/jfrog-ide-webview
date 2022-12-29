import { ICve } from '../../../../../model/cve'
import Wrapper from './Wrapper'
import css from './PublicResources.module.css'
import {
	AccessComplexityValueTranslator,
	AccessVectorTranslator,
	AttackVectorTranslator,
	AuthenticationValueTranslator,
	Cvss2,
	Cvss3,
	CvssScopTranslator,
	GeneralCvss3Translator,
	ImpactValueTranslator,
	UserInteractionTranslator
} from '../../../../../model/cvss'
import Row from '../../../../UI/Row/Row'

export interface Props {
  summary?: string;
  cve?: ICve;
  infectedVersions?: string[];
}

const PublicSources = (props: Props) => (
	<>
		{props.summary && (
			<Wrapper headline="SUMMARY">
				<span className={css.text}>{props.summary}</span>
			</Wrapper>
		)}
		{props.infectedVersions
			&& <Wrapper headline="VULNERABLE VERSIONS ">

				{props.infectedVersions.map((element, i) => (
					<div key={i} className={css.text}>
						<span>{element}</span>
					</div>
				))}
			   </Wrapper>}
		{(!!props.cve?.cvssV2Vector || !!props.cve?.cvssV3Vector) && (
			<Wrapper headline="CVSS BREAKDOWN">
				<div className={css.container}>
					{(props.cve.cvssV3Vector && props.cve.cvssV3Score) && createCvssBreakdownV3View(
						props.cve.cvssV3Vector,
						props.cve.cvssV3Score
					)}
					{(props.cve.cvssV2Vector && props.cve.cvssV2Score) && createCvssBreakdownV2View(
						props.cve.cvssV2Vector,
						props.cve.cvssV2Score
					)}
				</div>
			</Wrapper>
		)}
	</>
)

const createCvssBreakdownV2 = (vector: string[]): Cvss2 | undefined => {
	const results = new Cvss2()
	for (let index = 1; index < vector.length; index++) {
		const vectorElement = vector[index].split(':')
		if (vectorElement.length !== 2) {
			return undefined
		}
		switch (vectorElement[0]) {
			case 'AV':
				results.accessVector.value = AccessVectorTranslator(vectorElement[1])
				break
			case 'AC':
				results.accessComplexity.value = AccessComplexityValueTranslator(
					vectorElement[1]
				)
				break
			case 'Au':
				results.authentication.value = AuthenticationValueTranslator(
					vectorElement[1]
				)
				break
			case 'C':
				results.confidentialityImpact.value = ImpactValueTranslator(
					vectorElement[1]
				)
				break
			case 'I':
				results.integrity.value = ImpactValueTranslator(vectorElement[1])
				break
			case 'A':
				results.availabilityImpact.value = ImpactValueTranslator(
					vectorElement[1]
				)
				break
			default:
				return undefined
		}
	}
	return results
}

const createCvssBreakdownV3 = (vector: string[]): Cvss3 | undefined => {
	const results = new Cvss3()
	for (let index = 1; index < vector.length; index++) {
		const vectorElement = vector[index].split(':')
		if (vectorElement.length !== 2) {
			return undefined
		}
		switch (vectorElement[0]) {
			case 'AV':
				results.attackVector.value = AttackVectorTranslator(vectorElement[1])
				break
			case 'AC':
				results.attackComplexity.value = GeneralCvss3Translator(
					vectorElement[1]
				)
				break
			case 'PR':
				results.privilegesRequired.value = GeneralCvss3Translator(
					vectorElement[1]
				)
				break
			case 'UI':
				results.userInteraction.value = UserInteractionTranslator(
					vectorElement[1]
				)
				break
			case 'S':
				results.scope.value = CvssScopTranslator(vectorElement[1])
				break
			case 'C':
				results.confidentiality.value = GeneralCvss3Translator(
					vectorElement[1]
				)
				break
			case 'I':
				results.integrity.value = GeneralCvss3Translator(vectorElement[1])
				break
			case 'A':
				results.availability.value = GeneralCvss3Translator(vectorElement[1])
				break
			default:
				return undefined
		}
	}
	return results
}

const createCvssBreakdownV3View = (csvv: string, score: string) => {
	const csvvArray = csvv.split('/')
	const csvv3Breakdown = createCvssBreakdownV3(csvvArray)
	if (!csvv3Breakdown) {
		return defaultBreakdownView(csvv, score)
	}
	return (
		<>
			<div className={css.container}>
				<div className={css.header}>
					{csvvArray[0]} Base Score {score}
				</div>
				<div>
					{csvv3Breakdown
						.getBaseMatrix()
						.map((data, i) => (data.value ? <Row title={data.key} data={data.value} key={i}/> : <></>))}

					{csvv3Breakdown
						.getImpact()
						.map((data, i) => (data.value ? <Row title={data.key} data={data.value} key={i}/> : <></>))}
				</div>
			</div>
		</>
	)
}

const createCvssBreakdownV2View = (csvv: string, score: string) => {
	const csvvArray = csvv.split('/')
	const csvv2Breakdown = createCvssBreakdownV2(csvvArray)
	if (!csvv2Breakdown) {
		return defaultBreakdownView(csvv, score)
	}
	return (
		<div className={css.container}>
			<div className={css.header}>
				{csvvArray[0]} Base Score {score}
			</div>
			<div>
				{csvv2Breakdown
					.getBaseMatrix()
					.map((data, i) => (data.value ? <Row title={data.key} data={data.value} key={i}/> : <></>))}
				{csvv2Breakdown
					.getImpact()
					.map((data, i) => (data.value ? <Row title={data.key} data={data.value} key={i}/> : <></>))}
			</div>
		</div>
	)
}

const defaultBreakdownView = (csvv: string, score: string) => (
	<>
		<div>Score: {score}</div>
		<div>Vector: {csvv}</div>
	</>
)
export default PublicSources