import css from './Form.module.css'

export function Sso(): JSX.Element {
	return (
		<div className={css.credContainer}>
			<div className={css.paragraph}>
				To proceed with authentication, you will be redirected to the SSO login page.
			</div>
			<div className={css.paragraph}>
				Requires Artifactory version 7.64.0 or higher<span className={css.redStar}>*</span>
			</div>
		</div>
	)
}
