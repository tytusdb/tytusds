var round = function(input) {
	return ((1369 * input + 150889) % 714025) / 714025.0;
};

var permuteId = function(id) {
//console.log(id);
	id = Number(id);
  //console.log(id);

	var l1 = (id >> 16) & 65535;
  var r1 = id & 65535;
  var l2, r2;

  for (var i = 0; i < 3; i++) {
    l2 = r1;
    r2 = l1 ^ round(r1) * 65535;
    l1 = l2;
    r1 = r2;
	}

  return ((r1 << 16) + l1);
};

var getCode = function(id) {
	return permuteId(id).toString(36);
};
/*
var code = getCode(101010110101000);
var id = permuteId(parseInt(code, 36));

console.log(code, id);
*/
