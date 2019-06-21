import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Category.css';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';

import { withFirebase } from '../../Firebase';

import { QueryableFields as Video } from '../../Firebase/Models/Video';

import iconDiscipline from './assets/discipline.svg';
import iconSemester from './assets/semester.svg';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'discipline', //discipline or semester
      videos: null,
      loading: false
    };
  }

  componentDidMount() {
    const {
      firebase,
      match: { params }
    } = this.props;

    this.setState({ loading: true });

    firebase.video
      .getVideosBy(Video.DISCIPLINE, params.name)
      .then(videos => {
        this.setState({ videos, loading: false });
      })
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    const {
      match: { params }
    } = this.props;
    const { videos, loading } = this.state;
    let container = null;

    if (this.state.category === 'discipline') {
      container = (
        <>
          <div className="categoryInfos">
            <div>
              <h1 className="Medium-Text-Regular">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </h1>
            </div>
            <article />
          </div>
          <article className="line" />
          <h1 className="Small-Text-Bold titleSectionCategory">
            TRABALHOS DESTA DISCIPLINA
          </h1>
        </>
      );
    } else if (this.state.category === 'semester') {
      container = (
        <h1 className="Small-Text-Bold titleSectionCategory titleSectionSemester">
          TRABALHOS REALIZADOS EM 2019.1
        </h1>
      );
    }

    return (
      <div className="Category">
        {this.state.category === 'discipline' && (
          <TabBar
            icon={iconDiscipline}
            title={params.name}
            tabs={null}
            onTabChange={null}
            profileTeacher={false}
          />
        )}
        {this.state.category === 'semester' && (
          <TabBar
            icon={iconSemester}
            title="Semestre"
            tabs={null}
            onTabChange={null}
            profileTeacher={false}
          />
        )}
        <div className="container">
          {container}
          <CardList videos={videos} loading={loading} belowTab={false} />
        </div>
      </div>
    );
  }
}

export default withFirebase(withRouter(Category));
