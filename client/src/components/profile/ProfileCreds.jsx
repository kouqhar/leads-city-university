import moment from "moment";
import React, { Component } from "react";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // Experience Section
    const expItems =
      experience &&
      experience.map((exp) => (
        <li className="list-group-item" key={exp._id}>
          <h4>{exp.company}</h4>
          <p>
            <strong>Date: </strong>
            {moment(exp?.from).format("YYYY/MM/DD")} -
            {exp.to === null ? (
              " Now"
            ) : (
              <>{moment(exp?.to).format("YYYY/MM/DD")}</>
            )}
          </p>
          <p>
            <strong>Position: </strong>
            {exp.title}
          </p>
          <p>
            {exp.location === "" ? null : (
              <span>
                <strong>Location: </strong>
                {exp.location}
              </span>
            )}
          </p>
          <p>
            {exp.description === "" ? null : (
              <span>
                <strong>Description: </strong>
                {exp.description}
              </span>
            )}
          </p>
        </li>
      ));

    // Education Section
    const eduItems = education.map((edu) => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <strong>Date: </strong>
          {moment(edu?.from).format("YYYY/MM/DD")} -
          {edu.to === null ? (
            " Now"
          ) : (
            <>{moment(edu?.to).format("YYYY/MM/DD")}</>
          )}
        </p>
        <p>
          <strong>Degree: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience Listed</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education Listed</p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
