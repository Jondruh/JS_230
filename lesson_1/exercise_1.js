<div id="1">
  <h1 id="2">Hello, <em id="3">World</em></h1>
  <p id="4">
    Welcome to wonderland. This is an
    <span id="5">awesome</span> place.
  </p>
  <a href="#" id="6"><strong id="7">Enter</strong></a>
  <div id="8"><p id="9"><a href="#" id="10">Go back</a></p></div>
</div>

<script> 
function childNodes(startNode) {
  let result = [];
  let parentNode = document.getElementById(startNode);
  let allNodes = 0;
  let directChildren = parentNode.childNodes.length;

  (function counter(startNode) {
    let children = startNode.childNodes;
    allNodes += children.length;

    for (let i = 0; i < children.length; i += 1) {
      counter(children[i]);
    }
  })(parentNode);

  return [directChildren, allNodes - directChildren]
}

</script>
