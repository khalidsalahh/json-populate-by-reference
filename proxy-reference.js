const stories = [
  {
    type: "story",
    id: "story-1",
    author: { $ref: "people", id: "person-1" },
  },
  {
    type: "story",
    id: "story-2",
    author: { $ref: "people", id: "person-2" },
  },
];

const people = [
  {
    type: "person",
    id: "person-1",
    name: "John Storywriter",
    authored: [{ $ref: "stories", id: "story-1" }],
    likes: [
      { $ref: "stories", id: "story-1" },
      { $ref: "stories", id: "story-2" },
    ],
  },
  {
    type: "person",
    id: "person-2",
    name: "Peter Telltale",
    authored: [{ $ref: "stories", id: "story-2" }],
    likes: [
      { $ref: "stories", id: "story-1" },
      { $ref: "stories", id: "story-2" },
    ],
  },
];

const getByIdArray = function (collection = []) {
  return function (id = "") {
    return collection.find((item = {}) => item.id === id);
  };
};

const getByIdHash = function (collection = {}) {
  return function (id = "") {
    return collection[id];
  };
};

const getById = (collection) => {
  return Array.isArray(collection)
    ? getByIdArray(collection)
    : getByIdHash(collection);
};

function populateProxyRef(depth = 0, collections = {}, entry) {
  if (!entry || entry === null) {
    return entry;
  }

  if (
    Object.keys(entry).includes("$ref") &&
    Object.keys(entry).includes("id")
  ) {
    return populateProxyRef(
      depth - 1,
      collections,
      getById(collections[entry["$ref"]])(entry["id"])
    );
  }

  const handler = {
    get(target, key, reciever) {
      const value = Reflect.get(target, key, reciever);
      if (depth <= 0) {
        return value;
      }

      if (typeof value === "object") {
        return populateProxyRef(depth, collections, value);
      }

      return value;
    },
  };

  return Array.isArray(entry)
    ? entry.map((obj) => populateProxyRef(depth, collections, obj))
    : new Proxy(entry, handler);
}

const a = populateProxyRef(2, { stories, people }, people[0]);
console.log(JSON.stringify(a, null, 2));
