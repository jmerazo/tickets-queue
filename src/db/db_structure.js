const userStructure = (user) => {
    this.document_type = user.document_type;
    this.document_number = user.document_number;
    this.names = user.names;
    this.last_names = user.last_names;
    this.phone = user.phone;
    this.email = user.email;
    this.dependence_id = user.dependence_id;
    this.subdependence_id = user.subdependence_id
}

module.exports = {
    userStructure
}