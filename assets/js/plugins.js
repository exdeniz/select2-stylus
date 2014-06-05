$(".select2").select2({

})

var preload_data =  [
  {text: "Северо-западный регион", children: [
  { id: 'user0', text: 'Санкт-Петербург'}
  , { id: 'user1', text: 'Ленинградская область'}
    ]},
    {text: "Центральный", children: [
    { id: 'user3', text: 'Москва'}
    , { id: 'user4', text: 'Московская область',locked: true}
      ]}

];


$('.select2_multiple').select2({
    multiple:true,
    data: preload_data,
    placeholder: "Placeholder",
    allowClear:true
});

$(".select_open").select2("open")