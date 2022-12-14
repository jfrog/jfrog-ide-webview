import { ISeverity } from '../model/severity'
import severityLowImg from './../assets/Low.svg'
import Unknown from './../assets/Unknown.svg'
import severityMediumImg from './../assets/Medium.svg'
import high from './../assets/High.svg'
import critical from './../assets/Critical.svg'
import notApplicable from './../assets/Not_Applicable.svg'
import applicable from './../assets/Applicable.svg'

export const getSeverityImage = (severity: ISeverity) => {
	switch (severity) {
		case ISeverity.Unknown:
			return Unknown
		case ISeverity.Low:
			return severityLowImg
		case ISeverity.Medium:
			return severityMediumImg
		case ISeverity.High:
			return high
		case ISeverity.Critical:
			return critical
	}
}

export const getApplicabilityImg = (isApplicable: boolean) => {
	if (isApplicable) {
		return applicable
	}
	return notApplicable
}