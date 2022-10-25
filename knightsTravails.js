const getNextMoves = (x, y) => {
  let nextMoves = [];
  nextMoves.push([x - 2, y - 1]);
  nextMoves.push([x - 2, y + 1]);
  nextMoves.push([x - 1, y - 2]);
  nextMoves.push([x - 1, y + 2]);
  nextMoves.push([x + 1, y - 2]);
  nextMoves.push([x + 1, y + 2]);
  nextMoves.push([x + 2, y - 1]);
  nextMoves.push([x + 2, y + 1]);
  return nextMoves.filter(([a, b]) => a >= 0 && a < 8 && b >= 0 && b < 8);
};

const Node = function ([x, y]) {
  const position = [x, y];
  const history = [];
  const links = getNextMoves(x, y);
  const getNodesChildren = function () {
    const arrOfChildren = [];
    for (const entry of links) {
      let child = Node(entry);
      for (const item of history){
        child.history.push(item);
      }
      child.history.push(position)
      if (!history.includes(child.position)){
        arrOfChildren.push(child);
      }
    }
    return arrOfChildren;
  };
  
  return {
    position,
    links,
    getNodesChildren,
    history
  };
};

const knightMoves = ([xi, yi], [xf, yf]) => {
  if (xi < 0 || xi > 7 || yi < 0 || yi > 7) {
    console.log("starting position out of bounds");
    return null;
  }
  if (xf < 0 || xf > 7 || yf < 0 || yf > 7) {
    console.log("ending position out of bounds");
    return null;
  }

  let queue = [];
  const firstKnight = Node([xi, yi]);

  const recursiveSubroutine = (arrOfNodes) => {
    for (const entry of arrOfNodes){
      queue.push(entry);
    }
    for (let i = 0; i < queue.length; i++) {
      nodeToTest = queue.shift();
      if (xf === nodeToTest.position[0] && yf === nodeToTest.position[1]) {
        console.log(`You made it in ${nodeToTest.history.length} moves.`)
        console.log('Here is your path:')
        for (let i = 0; i < nodeToTest.history.length; i++) {
          console.log(`[${nodeToTest.history[i]}]`)
        }
        console.log(`[${nodeToTest.position}]`)
        return;
      }
      else {
        for (const node of nodeToTest.getNodesChildren()){
          queue.push(node)
        }
      }
    }
  }

  recursiveSubroutine([firstKnight])
};


knightMoves([3, 3], [3, 4])

