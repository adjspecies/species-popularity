(function() {

  /*

  MALE: ['a','Completely male'],
  OTHER: ['b','Predominantly male'],
  OTHER: ['c','Equal parts male and female'],
  OTHER: ['d','Predominantly female'],
  FEMALE: ['e','Completely female'],
  OTHER: ['f','Other']


  MALE: ['0','Completely heterosexual'],
  MALE: ['1','Mostly heterosexual'],
  OTHER: ['2','Bisexual leaning heterosexual'],
  OTHER: ['3','Bisexual'],
  OTHER: ['4','Bisexual leaning homosexual'],
  FEMALE: ['5','Mostly homosexual'],
  FEMALE: ['6','Completely homosexual']

  */

  var animalList = [
    {key: 'animal_wolf', name: 'Wolf'},
    {key: 'animal_redfox', name: 'Red fox'},
    {key: 'animal_dragon', name: 'Dragon'},
    {key: 'animal_domesticcat', name: 'Domestic cat'},
    {key: 'animal_tiger', name: 'Tiger'},
    {key: 'animal_husky', name: 'Husky'},
    {key: 'animal_otherdog', name: 'Other dog'},
    {key: 'animal_otherfeline', name: 'Other feline'},
    {key: 'animal_otherfox', name: 'Other fox'},
    {key: 'animal_arcticfox', name: 'Arctic fox'},
    {key: 'animal_rabbit', name: 'Rabbit'},
    {key: 'animal_kitsune', name: 'Kitsune'},
    {key: 'animal_lion', name: 'Lion'},
    {key: 'animal_othercanine', name: 'Other canine'},
    {key: 'animal_raccoon', name: 'Raccoon'},
    {key: 'animal_leopard', name: 'Leopard'},
    {key: 'animal_greyfox', name: 'Grey fox'},
    {key: 'animal_coyote', name: 'Coyote'},
    {key: 'animal_horse', name: 'Horse'},
    {key: 'animal_riverotter', name: 'River otter'},
    {key: 'animal_panther', name: 'Panther'},
    {key: 'animal_cheetah', name: 'Cheetah'},
    {key: 'animal_hyaena', name: 'Hyaena'},
    {key: 'animal_bat', name: 'Bat'},
    {key: 'animal_skunk', name: 'Skunk'},
    {key: 'animal_raptor', name: 'Raptor'},
    {key: 'animal_germanshepherd', name: 'German shepherd'},
    {key: 'animal_griffin', name: 'Griffin'},
    {key: 'animal_lizard', name: 'Lizard'},
    {key: 'animal_otherbird', name: 'Other bird'},
    {key: 'animal_deer', name: 'Deer'},
    {key: 'animal_squirrel', name: 'Squirrel'},
    {key: 'animal_raven', name: 'Raven'},
    {key: 'animal_otherreptile', name: 'Other reptile'},
    {key: 'animal_cougar', name: 'Cougar'},
    {key: 'animal_otherungulate', name: 'Other ungulate'},
    {key: 'animal_kangaroo', name: 'Kangaroo'},
    {key: 'animal_dinosaur', name: 'Dinosaur'},
    {key: 'animal_weasel', name: 'Weasel'},
    {key: 'animal_rat', name: 'Rat'},
    {key: 'animal_mouse', name: 'Mouse'},
    {key: 'animal_collie', name: 'Collie'},
    {key: 'animal_redpanda', name: 'Red panda'},
    {key: 'animal_pandabear', name: 'Panda bear'},
    {key: 'animal_seaotter', name: 'Sea otter'},
    {key: 'animal_othermustelid', name: 'Other mustelid'},
    {key: 'animal_polarbear', name: 'Polar bear'},
    {key: 'animal_grizzlybear', name: 'Grizzly bear'},
    {key: 'animal_brownbear', name: 'Brown bear'},
    {key: 'animal_other', name: 'Other'},
    {key: 'animal_otherbear', name: 'Other bear'},
    {key: 'animal_lemur', name: 'Lemur'},
    {key: 'animal_othermarsupial', name: 'Other marsupial'},
    {key: 'animal_badger', name: 'Badger'},
    {key: 'animal_othermusteloid', name: 'Other musteloid'},
    {key: 'animal_monkey', name: 'Monkey'},
    {key: 'animal_otherprimate', name: 'Other primate'},
    {key: 'animal_koala', name: 'Koala'},
    
  ];

  var sexList = [
    ['.','All'],
    ['a','Male'],
    ['b','Female'],
    ['c','Other']
  ];

  var genderList = [
    ['.','All'],
    ['a','Completely male'],
    ['b','Predominantly male'],
    ['c','Equal parts male and female'],
    ['d','Predominantly female'],
    ['e','Completely female'],
    ['f','Other']
  ];
    
  var orientationList = [
    ['.','All'],
    ['0','Completely heterosexual'],
    ['1','Mostly heterosexual'],
    ['2','Bisexual leaning heterosexual'],
    ['3','Bisexual'],
    ['4','Bisexual leaning homosexual'],
    ['5','Mostly homosexual'],
    ['6','Completely homosexual']
  ];


  _.mixin({
    sum: function(obj, key, memo) {
      return _.reduce(obj, function(mem, val) {
        return mem + (val[key] || 0);
      }, memo || 0);
    }
  });


  function getStructuredData(data, baselineFilter, queryFilter) {

    var baselineData = _.filter(data, function(val, key) {
      return key.match(baselineFilter);
    });

    var baselineCount = _.sum(baselineData, 'count');

    // console.log("baselineCount:", baselineCount);
    // console.log("baselineData:", baselineData);


    var queryData = _.filter(data, function(val, key) {
      return key.match(queryFilter);
    });

    var queryCount = _.sum(queryData, 'count');

    // console.log("queryCount:", queryCount);
    // console.log("queryData:", queryData);


    var structuredData = _.map(animalList, function(animal) {
      var d = {
        animalName: animal.name,
        totals: [
          {
            name: 'baseline',
            value: _.sum(baselineData, animal.key) / baselineCount
          },
          {
            name: 'query',
            value: _.sum(queryData, animal.key) / queryCount
          }
        ]
      };
      return d;
    });

    return structuredData;
  }


  var margin = {top: 22, right: 0, bottom: 0, left: 100};
  var width = 850 - margin.left - margin.right;
  var height = 1600 - margin.top - margin.bottom;

  var x = d3.scale.linear()
      .range([0, width]);

  var y0 = d3.scale.ordinal()
      .rangeRoundBands([0, height], .2);

  var y1 = d3.scale.ordinal();

  var color = d3.scale.ordinal()
      .range(['#98abc5', '#8a89a6']);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient('top')
      .tickFormat(d3.format('%'));

  var yAxis = d3.svg.axis()
      .scale(y0)
      .orient('left');

  var svg = d3.select('body').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var xAxisSVG = svg.append('g')
      .attr('class', 'x axis');

  var yAxisSVG = svg.append('g')
      .attr('class', 'y axis');
  

  function update() {
    var baselineSexFilter = d3.select('#baseline-sex-options').property('value');
    var baselineGenderFilter = d3.select('#baseline-gender-options').property('value');
    var baselineOrientationFilter = d3.select('#baseline-orientation-options').property('value');
    var querySexFilter = d3.select('#query-sex-options').property('value');
    var queryGenderFilter = d3.select('#query-gender-options').property('value');
    var queryOrientationFilter = d3.select('#query-orientation-options').property('value');

    var baselineFilter = baselineSexFilter + baselineGenderFilter + baselineOrientationFilter;
    var queryFilter = querySexFilter + queryGenderFilter + queryOrientationFilter;

    console.log("baselineFilter:", baselineFilter);
    console.log("queryFilter:", queryFilter);

    var data = getStructuredData(speciesdata, baselineFilter, queryFilter);

    console.log('update data:', data);

    x.domain([0, d3.max(data, function(d) {
      return d3.max(d.totals, function(d) { return d.value; });
    })]);

    y0.domain(data.map(function(d) { return d.animalName; }));

    y1.domain(['baseline', 'query']).rangeRoundBands([0, y0.rangeBand()]);

    xAxisSVG.transition().duration(750).call(xAxis);

    yAxisSVG.call(yAxis);

    // DATA JOIN
    var animals = svg.selectAll('.animal')
        .data(data, function(d) { return d.animalName; });

    // UPDATE
    animals
        .attr('transform', function(d) { return 'translate(0,' + y0(d.animalName) + ')'; });

    // ENTER
    animals.enter().append('g')
        .attr('class', 'animal')
        .attr('transform', function(d) { return 'translate(0,' + y0(d.animalName) + ')'; });

    // EXIT
    animals.exit().remove();

    // DATA JOIN
    var bars = animals.selectAll('rect')
        .data(function(d) { return d.totals; }, function(d) { return d.name; });

    // UPDATE
    bars
        .transition()
        .duration(750)
          .attr('width', function(d) { return x(d.value); });

    // ENTER
    bars.enter().append('rect')
        .attr('x', 0)
        .attr('y', function(d) { return y1(d.name); })
        .attr('width', function(d) { return x(d.value); })
        .attr('height', y1.rangeBand())
        .style('fill', function(d) { return color(d.name); });

    // EXIT
    bars.exit().remove();
  }

  var speciesdata = null;

  d3.json('data/speciesdata.json', function(err, data) {

    // 58 animals
    // 108 categories

    /* structuredData looks like this
        [
          {
            animalName: 'Kistune',
            totals: [
              { name: 'baseline', value: 1234 },
              { name: 'query', value: 345 }
            ]
          }
        ]
    */

    // 000 contains the data for ALL categories, so will double the totals if it's left in
    delete data['000'];

    speciesdata = data;

    update();

    d3.select('#baseline-gender-options').on('change', function() { update(); });
    d3.select('#baseline-sex-options').on('change', function() { update(); });
    d3.select('#baseline-orientation-options').on('change', function() { update(); });
    d3.select('#query-gender-options').on('change', function() { update(); });
    d3.select('#query-sex-options').on('change', function() { update(); });
    d3.select('#query-orientation-options').on('change', function() { update(); });

  });

})();