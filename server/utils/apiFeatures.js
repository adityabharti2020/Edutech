class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    console.log("query", queryString);
  }
  filter() {
    const queryObj = { ...this.queryString };
    // we can get all course,and ?coursePrice=10000 , ?coursePrice[gt]=10000 these query is excutable.
    const excludesFields = ["page", "sort", "limit", "fields"];
    excludesFields.forEach((e1) => delete queryObj[e1]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g, //RegEX to search and replace that string with match
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);
      const sortBy = this.queryString.sort.split(",").join(" ");
      console.log(sortBy);
      // query = query.sort(req.query.sort) for sorting as acsending and decsending
      this.query = this.query.sort(sortBy); //If same value and need another parameter to sort them
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  limitingField() {
    if (this.queryString?.fields) {
      const fields = this.queryString?.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = (this.queryString.page * 1) | 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
