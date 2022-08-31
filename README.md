# json-populate-clone
```js
/**
 * Import lib
 */
const { populateByReference } = require('json-populate');

/**
 * Example data
 */
const stories = [
  {
    type: 'story',
    id: 'story-1',
    author: { $ref: 'people', id: 'person-1' }
  },
  {
    type: 'story',
    id: 'story-2',
    author: { $ref: 'people', id: 'person-2' }
  },
];

const people = [
  {
    type: 'person',
    id: 'person-1',
    name: 'John Storywriter',
    authored: [
      { $ref: 'stories', id: 'story-1' },
    ],
    likes: [
      { $ref: 'stories', id: 'story-1' },
      { $ref: 'stories', id: 'story-2' },
    ],
  },
  {
    type: 'person',
    id: 'person-2',
    name: 'Peter Telltale',
    authored: [
      { $ref: 'stories', id: 'story-2' },
    ],
    likes: [
      { $ref: 'stories', id: 'story-1' },
      { $ref: 'stories', id: 'story-2' },
    ],
  }
];

/**
 * Consolidate the collections into a "graph"
 */
const graph = { people, stories };

/**
 * Choose an entry point to the graph
 */
const entry = people[0];

/**
 * Create a populated entry point resolved against the graph with a specified depth
 */
const populatedItem = populateByReference(2, graph, entry);

/**
 * Result
 */
console.log(JSON.stringify(populatedItem, null, 2));

/**
 * {
 *   "type": "person",
 *   "id": "person-1",
 *   "name": "John Storywriter",
 *   "authored": [
 *     {
 *       "type": "story",
 *       "id": "story-1",
 *       "author": {
 *         "type": "person",
 *         "id": "person-1",
 *         "name": "John Storywriter",
 *         "authored": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-1"
 *           }
 *         ],
 *         "likes": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-1"
 *           },
 *           {
 *             "$ref": "stories",
 *             "id": "story-2"
 *           }
 *         ]
 *       }
 *     }
 *   ],
 *   "likes": [
 *     {
 *       "type": "story",
 *       "id": "story-1",
 *       "author": {
 *         "type": "person",
 *         "id": "person-1",
 *         "name": "John Storywriter",
 *         "authored": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-1"
 *           }
 *         ],
 *         "likes": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-1"
 *           },
 *           {
 *             "$ref": "stories",
 *             "id": "story-2"
 *           }
 *         ]
 *       }
 *     },
 *     {
 *       "type": "story",
 *       "id": "story-2",
 *       "author": {
 *         "type": "person",
 *         "id": "person-2",
 *         "name": "Peter Telltale",
 *         "authored": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-2"
 *           }
 *         ],
 *         "likes": [
 *           {
 *             "$ref": "stories",
 *             "id": "story-1"
 *           },
 *           {
 *             "$ref": "stories",
 *             "id": "story-2"
 *           }
 *         ]
 *       }
 *     }
 *   ]
 * }
 */
```
