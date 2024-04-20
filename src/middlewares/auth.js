const auth = (request, response, next) => {
    if (!request.session || !request.session.user) {
        return response.redirect("/login");
    };
    next();
};

export default auth;