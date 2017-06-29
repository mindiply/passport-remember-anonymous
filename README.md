#passport-remember-anonymous

Passport strategy that allows anonymous users, but keeps track of them via a cookied. 

Our use case is a simple web application where users can vote anonymously, but we want to 
avoid them voting multiple times. After the first time they vote, we would remember they already voted.

Useful only if the obvious lack of security is acceptable for your application.

## Usage

## Thanks

Thanks to [Jared Hanson](https://github.com/jaredhanson) for his great [Passport](http://passportjs.org)

## License

[The MIT License](http://opensource.org/licenses/MIT)