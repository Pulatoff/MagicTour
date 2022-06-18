class FeaturiesAPI {
  constructor(clientQuery, dbQuery) {
    this.clientQuery = clientQuery;
    this.dbQuery = dbQuery;
  }
  filter() {
    const queryObj = { ...this.clientQuery };
    const deleteQuerys = ["limit", "field", "page", "limit"];
    deleteQuerys.forEach((val) => delete queryObj[val]);
    let queryStr = JSON.stringify(queryObj);
    queryStr.replace(/\bgt|gte|lte|lt\b/g, (val) => `$${val}`);
    let queryData = JSON.parse(queryStr);
    this.dbQuery = this.dbQuery.find(queryData);
    return this;
  }
  sort() {
    if (this.clientQuery.sort) {
      const sortQuery = this.clientQuery.sort.split(",").join(" ");
      this.dbQuery = this.dbQuery.sort(sortQuery);
    }
    return this;
  }
  field() {
    if (this.clientQuery.field) {
      const fieldQuery = this.clientQuery.field.split(",").join(" ");
      this.dbQuery = this.dbQuery.selected(fieldQuery);
    }
    return this;
  }
  pagination() {
    const page = this.clientQuery.page * 1 || 1;
    const limit = this.clientQuery.limit * 1 || 3;
    const skip = (page - 1) * limit;
    this.dbQuery = this.dbQuery.skip(skip).limit(limit);
    return this;
  }
}

module.exports = FeaturiesAPI;
