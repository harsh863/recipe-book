import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rb-recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})
export class RecipePreviewComponent implements OnInit {

  constructor() { }

  recipe = {
    "name":"Egg Roll",
    "is_private":false,
    "image_url": "https://image.shutterstock.com/image-photo/gooey-delicious-grilled-cheese-sandwiches-260nw-287194670.jpg",
    "description":"Delicious Egg Roll.",
    "recipe":"<ol><li>For the outer&nbsp;<em>paratha</em>/wrap, add the flour, salt, sugar, and&nbsp;<em>dalda</em>&nbsp;to a mixing bowl. Combine the ingredients until the fat is well dispersed in the flour. Take your time and rub the flour between your fingers until it resembles breadcrumbs in texture. This will lead to a flakier crust.</li><li>Now add the warm water and knead the dough for about 5 minutes until it is soft and smooth. Coat it with oil, cover the bowl, and allow it to rest for 30 minutes.</li><li>Meanwhile, mix together finely sliced onions, chopped green chillies and the juice of half a lime. Pickling the onions in lime juice reduces their sharpness. If using cucumber, peel it and remove the central seeds. Then chop them into thin matchsticks. Create an assembly station where you gather all the items required for the filling. This will allow you to easily put together the roll once the&nbsp;<em>paratha</em>&nbsp;is off the stove.</li><li>Back to the dough: once it has rested, divide it in 130 g portions. For an extra-flaky exterior, we will roll the dough in the&nbsp;<em>lachcha paratha</em>&nbsp;style, incorporating layers of flour and oil. To do this, form a ball and roll it out to a disc about 12 cm large. Apply a thin layer of oil on the surface and sprinkle some dry flour. Make an incision on the disc along a radius and roll it in the shape of a cone [WATCH THE VIDEO]. Press down to flatten. Rest the dough for about 5 minutes to relax it again, after which roll it for a second time to disc 22 cm in diameter.</li><li>Beat an egg with a pinch of salt and keep at the ready.</li><li>Heat about 4 tsp oil (12 g) in a flat frying pan or skillet. Add the&nbsp;<em>paratha</em>&nbsp;and fry it on both sides until golden. Rotate the&nbsp;<em>paratha</em>continuously, flipping often, for a uniform crust. Pay special attention to the sides to ensure that they crisp too. Once the&nbsp;<em>paratha</em>is completely cooked, spread the beaten egg over it. Before it settles, turn over to fry the side with the egg. Transfer it to the assembly station, with the egg side facing up.</li><li>Sprinkle it with&nbsp;<em>chaat masala</em>&nbsp;and rocksalt. Add a row of the pickled onions a little off the centre of the&nbsp;<em>paratha</em>. Squeeze some lime juice over it. Top it with cucumber if you like. One of our favourite variations of the egg roll is the egg-potato roll. If we have it on hand, we like to add some leftover spicy&nbsp;<em>alu’r torkari</em>&nbsp;as well. Finish everything off with a few squirts of ketchup.</li><li>Form a tight roll, making sure the filling is all enclosed within the&nbsp;<em>paratha</em>. Wrap a paper around two-thirds of the roll and tuck any excess at the bottom.</li></ol><p><br></p>",
    "ingredients":[
      {
        "name":"egg",
        "quantity":4,
        "unit":null
      },
      {
        "name":"onions",
        "quantity":150,
        "unit":"g"
      }
    ]
  };

  ngOnInit() {
  }

}
