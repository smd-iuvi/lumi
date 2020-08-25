export const methods = {
    POST: 'post',
    GET: 'get',
    DELETE: 'delete',
    PUT: 'put',
    UPDATE: 'update'
}

export function Category({ name, endpoints }) {
    return {
        name: name,
        endpoints: endpoints
    }
}

export function Endpoint({
    title,
    method,
    url,
    description,
    useCases,
    businessRoles,
    parameters,
    responses }) {
    return {
        title: title,
        method: method,
        url: url,
        description: description,
        useCases: useCases,
        businessRoles: businessRoles,
        parameters: parameters,
        responses: responses
    };
}

export function Parameter({
    name,
    description,
    value }) {
    return {
        name: name,
        description: description,
        value: value
    };
}

export function Response({
    code,
    description,
    value }) {
    return {
        code: code,
        description: description,
        value: value
    };
}