import React from 'react';
import './Content.css';
import Accordion from '../../../components/Accordion/Accordion';

function Content(props) {
    return <div>
        {props.endpoint.endpoints.map((item) =>
            <Accordion
                title={item.title}
                subtitle={item.method}
                content={
                    <div className="contentDocumentation">
                        <article className="block">
                            <p className="Small-Text-Regular">{item.description}</p>
                        </article>
                        <article className="block">
                            <p className="Medium-Text-Bold">Casos de Uso:</p>
                            {item.useCases.map((useCase) =>
                                <p className="Small-Text-Regular value">• {useCase}</p>
                            )}
                        </article>
                        <article className="block">
                            <p className="Medium-Text-Bold">Regras de Negócio:</p>
                            {item.businessRoles.map((businessRole) =>
                                <p className="Small-Text-Regular value">• {businessRole}</p>
                            )}
                        </article>
                        <article className="block">
                            <p className="Medium-Text-Bold">Parâmetros:</p>
                            {item.parameters.map((parameter) =>
                                <>
                                    <article>
                                        <p className="Small-Text-Bold value">• {parameter.name}:</p>
                                        <p className="Small-Text-Regular">{parameter.description}</p>
                                    </article>
                                    {parameter.value !== "" &&
                                        <pre>
                                            <code className="Small-Text-Regular">{parameter.value}</code>
                                        </pre>}
                                </>
                            )}
                        </article>
                        <article className="block">
                            <p className="Medium-Text-Bold">Respostas:</p>
                            {item.responses.map((response) =>
                                <>
                                    <article>
                                        <p className="Small-Text-Bold value">• {response.code}:</p>
                                        <p className="Small-Text-Regular">{response.description}</p>
                                    </article>
                                    {response.value !== "" &&
                                        <pre>
                                            <code className="Small-Text-Regular">{response.value}</code>
                                        </pre>}
                                </>
                            )}
                        </article>
                    </div>
                }
            />
        )}
    </div>
}

export default Content;