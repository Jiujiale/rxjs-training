const { Observable } = require('rxjs');

// create Observable
const observable = new Observable((subscriber) => {
    subscriber.next(10);
    subscriber.next(11);
    subscriber.next(12);
})

// create observer
const observer = {
    next: (v) => {
        console.log('Observable got a value of ' + v)
    },
    error: (err) => {
        console.log('Observable got an error of ', err)
    },
    complete: () => {
        console.log('Observable got a complete notification')
    }
}

// connect together
observable.subscribe(observer)
