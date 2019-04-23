# EventManager
This provides a simple class that deals with event creation and emitting. The class `EventManager` is convenient to inherit from but it can also be used in composition.

## Install
```
$ npm install --save @jonathanlurie/eventmanager
```

## Usage
Create your own class that inherit from `EventManager`:

``` javascript
import EventManager from '@jonathanlurie/eventmanager'

class MyClass extends EventManager {

  constructor(){
    super()
  }

  doesSomethingThatEmitsEvent(){
    // ...
    this.emit('someEventName', [arg1, arg2, arg3])
    // ...
  }
}
```
Note that the arguments have to be inside an array, always, for example, you cannot do:
``` javascript
this.emit('someEventName', arg1, arg2, arg3) // NOT GOOD!!!
this.emit('someEventName', [arg1, arg2, arg3]) // GOOD :)
```

And if the argument you want to pass is already an array, then you still have to put it into an array:
``` javascript
let someData = [0, 1, 2, 3]
this.emit('someEventName', someData) // NOT GOOD!!!
this.emit('someEventName', [someData]) // GOOD :)
```

Then, when instantiating `MyClass`:

``` javascript
let foo = new MyClass()

// define an event (before it's supposed to be emitted)
foo.on('someEventName', function(someArg1, someArg2){
  console.log('The event is triggered!')
})

foo.doesSomethingThatEmitEvent()
```

We can have as many callbacks we want for a given event name, they will be called on the order they were added:
``` javascript
let foo = new MyClass()

// define an event
foo.on('someEventName', function(someArg1, someArg2){
  console.log('The event is triggered!')
})

foo.on('someEventName', function(someArg1, someArg2){
  console.log('The event is triggered!')
})

foo.on('someEventName', function(someArg1, someArg2){
  console.log('This other event is also triggered!')
})

foo.on('someEventName', function(someArg1, someArg2){
  console.log('Finally, this one too!')
})

foo.doesSomethingThatEmitEvent()
```

The method `.on()` returns an ID we have not used so far, but this comes handy to remove an event:
``` javascript
let foo = new MyClass()

// define an event
let eventId0 = foo.on('someEventName', function(someArg1, someArg2){
  console.log('The event is triggered!')
})

let eventId1 = foo.on('someEventName', function(someArg1, someArg2){
  console.log('The event is triggered!') //  <-- WE WANT TO REMOVE THIS ONE!
})

let eventId2 = foo.on('someEventName', function(someArg1, someArg2){
  console.log('This other event is also triggered!')
})

let eventId3 = foo.on('someEventName', function(someArg1, someArg2){
  console.log('Finally, this one too!')
})

// ...
foo.delete(eventId1)
// ...

foo.doesSomethingThatEmitEvent()
```

Here, this output will be:
```
The event is triggered!
This other event is also triggered!
Finally, this one too!
```

Of course, we can have many events and many event names:

```javascript
let foo = new MyClass()

foo.on('dataParsed', function(data){
  console.log('The data is parsed')
})

foo.on('dataDeleted', function(){
  console.log('The data is deleted')
})

foo.on('rowAdded', function(someRow){
  console.log('A row was added')
})
```


By default, an instance of `EventManager` will emit event as they are added. Though, sometimes it can be convenient to not emit any events even though they are defined and to later enable them. Disabling events can be done at two moments:
- At constructor time: `new EventManager(false)` or `super(false)` in our inheritance example
- After instantiation: `foo.disableEvents()`

Even though event emitting is disabled, we can still add more.  
Later, we can  call `foo.enableEvents()` to let our instance emit events.
