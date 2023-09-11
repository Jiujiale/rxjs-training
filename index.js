const { Observable } = require('rxjs');
const { map } = require('rxjs/operators');
const user = {
    data: [
        {
            status: 'inactive',
            age: 11
        },
        {
            status: 'active',
            age: 17
        },
        {
            status: 'active',
            age: 45
        },
        {
            status: 'inactive',
            age: 51
        },
    ]
}

// create Observable
const observable = new Observable((subscriber) => {
    subscriber.next(user);
}).pipe(
    map((data) => {
        console.log('data from Observable', data)
        return data.data
    }),
    map((data) => {
        console.log('data from the first operator', data)
        return data.filter(s => s.status === 'active')
    }),
    map((data) => {
        console.log('data from the second operator', data)
        return data.reduce((prev, curr) => {
            return prev + curr.age
        }, 0)
    })
)

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
