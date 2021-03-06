<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [EventManager][1]
    -   [Parameters][2]
    -   [countEvents][3]
        -   [Parameters][4]
    -   [disableEvents][5]
    -   [enableEvents][6]
    -   [on][7]
        -   [Parameters][8]
    -   [delete][9]
        -   [Parameters][10]
-   [uuidv4][11]
    -   [Parameters][12]

## EventManager

The EventManager deals with events, create them, call them.
This class is mostly for being inherited from.

### Parameters

-   `enabled` **[boolean][13]** if true (default), the events emitting is enabled, if false, they won't be fired. (optional, default `true`)

### countEvents

Tells how many events are registered under this event name

#### Parameters

-   `eventName`  

Returns **[number][14]** 

### disableEvents

This way, the events are not emitted

### enableEvents

This way, the events are properly emitted

### on

Define an event, with a name associated with a function

#### Parameters

-   `eventName` **[String][15]** Name to give to the event
-   `callback` **[Function][16]** function associated to the even

Returns **([string][15] | null)** the eventId (useful to remove it) or null if the event couldnt be added

### delete

Delete an event using its id

#### Parameters

-   `eventId`  
-   `id` **[string][15]** id of the event (returned by the `.on()` method)

## uuidv4

This is borrowed from [https://gist.github.com/jed/982883][17]
because the uuid most popular package is using a node dep

### Parameters

-   `a`  

[1]: #eventmanager

[2]: #parameters

[3]: #countevents

[4]: #parameters-1

[5]: #disableevents

[6]: #enableevents

[7]: #on

[8]: #parameters-2

[9]: #delete

[10]: #parameters-3

[11]: #uuidv4

[12]: #parameters-4

[13]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[14]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number

[15]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[16]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[17]: https://gist.github.com/jed/982883
