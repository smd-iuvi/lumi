import React, { Component } from 'react';
import './Category.css';

import TabBar from '../../components/TabBar/TabBar';
import CardList from '../../components/CardList/CardList';

import iconDiscipline from './assets/discipline.svg';
import iconSemester from './assets/semester.svg';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'discipline' //discipline or semester
        }
    }

    render() {
        let container = null;

        if (this.state.category === 'discipline') {
            container = (
                <>
                    <div className="categoryInfos">
                        <div>
                            <h1 className="Medium-Text-Regular">A Educomunicação é um campo interdisciplinar em grande ascensão mundialmente, ocupando-se dos processos dialógicos do ato educativo. O profissional de Sistemas e Mídias Digitais de hoje, que
transita em várias áreas (educação formal, não formal, informal), deve saber transcender a instrumentalidade técnica, promovendo a conversão da comunicação em processo educativo.</h1>
                        </div>
                        <article></article>
                    </div>
                    <article className="line"></article>
                    <h1 className="Small-Text-Bold titleSectionCategory">TRABALHOS DESTA DISCIPLINA</h1>
                </>
            );
        } else if (this.state.category === 'semester') {
            container = <h1 className="Small-Text-Bold titleSectionCategory titleSectionSemester">TRABALHOS REALIZADOS EM 2019.1</h1>;
        }

        return (
            <div className="Category">
                {this.state.category === 'discipline' &&
                    <TabBar
                        icon={iconDiscipline}
                        title="Disciplina"
                        tabs={null}
                        onTabChange={null}
                        profileTeacher={false}
                    />
                }
                {this.state.category === 'semester' &&
                    <TabBar
                        icon={iconSemester}
                        title="Semestre"
                        tabs={null}
                        onTabChange={null}
                        profileTeacher={false}
                    />
                }
                <div className="container">
                    {container}
                    <CardList videos={null} loading={false} belowTab={true} />
                </div>
            </div>
        );
    }
}

export default Category;