
export class Product {
    constructor(
        public name  : String,
        public description : String,
        public logo : String,
        public date_release : Date,
        public date_revision : Date,
        public id? : String
    ) {}

}