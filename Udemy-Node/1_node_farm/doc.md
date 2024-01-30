# Synchronous vs Asynchronous (Blocking vs Non-blocking)

## Overview

- Single thread 
- "Back-ground" is where time-consuming tasks should be executed. 
- Asynchronous way : Non-blocking I/O model. This is why we use so many call back functions in JS
- Callbacks are not all asynchronous 
- Escaping call back hell: promises, async/await 

## MongoDB? 

- Document based (field-value pair data structures)
- Scalable: Very easy to distribute data across multiple machines as your users and amount of data grows. 
- Flexible: No document data schema required. Each document can have different number and type of fields 
- Performant: Embedded data models, indexing, sharding...

### Documents, BSON and Embedding 

- BSON: Data format MongoDB uses for data storage. Like JASON, but typed. So MongoDB documents are typed. 
- Embedding/Denormalizing: Including related data into a single document. This allows for quicker access and easier data models. (not always best solution though)
- 