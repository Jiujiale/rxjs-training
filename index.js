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
            age: 9
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

const user2 = {
    data: [
        {
            status: 'inactive',
            age: 11
        },
        {
            status: 'active',
            age: 7
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
    subscriber.next(user2);
    subscriber.complete()
    subscriber.next(user);
    subscriber.next(user2);
}).pipe(
    map((data) => {
        // console.log('data from Observable', data)
        return data.data
    }),
    map((data) => {
        // console.log('data from the first operator', data)
        return data.filter(s => s.status === 'active')
    }),
    map((data) => {
        // console.log('data from the second operator', data)
        return data.reduce((prev, curr) => {
            return prev + curr.age
        }, 0)
    }),
    map((data) => {
        if (data > 60) {
            throw new Error('age is too old')
        }
        return data
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
