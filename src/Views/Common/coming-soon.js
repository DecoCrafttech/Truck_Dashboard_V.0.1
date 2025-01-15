import React from 'react';
import { Link } from 'react-router-dom';

const ComingSoon = ({
	page_title
}) => { 

	return <div className="h-100 text-dark bg-light">
		<div className="container h-100">
			<div className="row align-items-center h-100">
				<div className="col-lg-12">
					<div className="text-center pt-0">
						<div className="section-title-area ltn__section-title-2">
							<h3 className="text-danger">{page_title}</h3>
							<h4 className="text-secondary">Coming Soon</h4>
						</div>
						<div className="btn-wrapper mt-50">
							<Link to="/dashboard/home" className="btn btn-danger theme-btn-2 text-uppercase">Back to Home</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
}

export default ComingSoon