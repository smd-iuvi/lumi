export const methods = {
    POST, GET, DELETE, PUT, UPDATE
}

function Endpoint({
    title,
    method,
    url,
    description,
    businessRoles }) {
    return {
        title: title,
        method: method,
        url: url,
        description: description,
        businessRoles: businessRoles
    };
}

function Parameter({
    name,
    description,
    value }) {
    return {
        name: name,
        description: description,
        value: value
    };
}

function Response({
    code,
    description,
    value }) {
    return {
        code: code,
        description: description,
        value: value
    };
}