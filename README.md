# University of Pennsylvania EAS 499 Senior Project: Cryptoathletes

Motivated by Cryptokitties’ successful application of the ERC-721 token standard, we sought out to create a similar Dapp game that focuses on professional athletes. Cryptoathletes are digital, collectible football athletes built on the Ethereum blockchain. They can be bought and created using ether, and can battle/faceoff against other users’ Cryptoathletes. Each athlete token possesses a set of offensive and defensive attributes that affects whether it will be victorious in a faceoff against another athlete token. Any new user of Cryptoathletes can create one free random athlete for his or herself after joining the game. Additional athletes are available for purchase through a pack system. Similar to popular App Store games, such as Hearthstone, users can purchase packs of these digitally collectible players (two athletes per pack) using ether. 

## Key Features 

### Create Random Athlete Token

In Cryptoathletes, first time users have the ability to generate their own ERC-721 athlete token. The user has the choice to name the token at the start of its creation. These athlete tokens are each given a randomly generated DNA attribute. (Randomness is a key issue facing many blockchain applications because of its difficulty to obtain, as I will later discuss.) This DNA attribute is just a uint (unsigned integer) that represents physical features of the players. I was not able to extend this feature to the front end of this iteration of my application, but I had planned to represent each pair of bytes within the uint as different physical features of the athletes (eye color, hair color, etc.) much like Cryptokitties. Each randomly generated athlete possesses the same default offensive and defensive ratings. For this iteration, the default offensive rating was set as 70 and default defensive rating as 50. Users will only be able to create a “free” random athlete token if they do not already own any athlete tokens. This limits new users from being able to create unlimited amount of athlete tokens. The following code is called by the JavaScript frontend to create the random athletes:

![picture1](https://user-images.githubusercontent.com/10999750/41308986-42239296-6e32-11e8-8fad-4f05e070d9a4.png)

### Pack of Athletes for Purchase

New users as noted, cannot generate more than one athlete token for his/herself. However, users can purchase additional tokens for his/herself using ether. In the app, users can pay a fee (currently set at 0.08 ether) to buy a pack of two randomly generated (both have random DNAs, random names, and default ratings). There is no limit to the amount of packs a user can buy; however, it is important to note that if this game was to scale, the price of a pack could greatly affect the transaction speed and transaction costs (We will discuss, in detail, the Ethereum transaction costs, gas prices, and transaction speed later.) of the Dapp. The following function is executed by the front end to purchase the pack of athletes for the user:

![picture2](https://user-images.githubusercontent.com/10999750/41309317-586db09e-6e33-11e8-9e31-c05cd68f1b9e.png)

### Face Off Against Other Athlete Tokens

Once a user possesses a Cryptoathlete, he/she can choose to faceoff/matchup against other users’ Cryptoathletes. The user can choose to attack whichever opposing athlete token he/she chooses. If the user successfully defeats the opposing athlete token that he/she has attacked, then a win will be recorded to the winning athlete token and a loss will be recorded to the losing athlete token. The probability that the user’s athlete will win against an opposing athlete is o_1/(o_1+d_2 ), where o1 is the offensive rating of the attacking athlete and d2 is the defensive rating of the defending athlete. The game probability mechanism was designed, so that these battles would depend on the game attributes of each athlete token. If the face off results in a win, the attacking athlete token’s offensive rating earns a one-point increase, while the defending athlete token’s defensive rating decreases by one point. Otherwise, if the face off is a loss, the attacking token’s offensive rating decreases by one point, while the defending token earns one defensive rating point. In the current iteration of the application, new users can test this functionality by choosing to face off against a dummy (default settings) athlete owned by a dummy Ethereum account. The following function is executed during an attack:

![picture3](https://user-images.githubusercontent.com/10999750/41309391-8c14fa92-6e33-11e8-9042-42a779c03044.png)


### Change your Athlete’s Name/DNA

Users that have athlete tokens of at least level 2 can select an option to change their name to any of their choosing. Users can also change their DNA to whatever uint of their choosing; however, the athlete tokens that they wish to change must be at least level 20. Athlete tokens that do not meet the level requirement will not be able to do these actions. The following functions are called by the frontend when changing either name or DNA:

![picture4](https://user-images.githubusercontent.com/10999750/41309464-b815d47c-6e33-11e8-9c14-ee583a546c63.png)

### Pay to Level Up

Users have the option to pay a fee to increase the level of their desired athlete token by one level. Within the game, users can simply choose the option to level up their players, and the application will take their appropriate ether fees and increase the level of those players. The following function is called by the front end when paying to level up:

![picture5](https://user-images.githubusercontent.com/10999750/41309513-cee3f1d4-6e33-11e8-9487-e30c5a1ce943.png)

### Transfer Athlete

Users have the option to transfer their tokens to other players. I was not able to implement an auctioning or exchange to trade these players for this iteration of the application. Nonetheless, in its current version, users can give/gift their athlete tokens to other users of their choice. In future versions of this applications, I would add an auction system, so players can barter their athlete tokens. The following lines of code are called by the frontend when transferring an athlete token to another player:

![picture6](https://user-images.githubusercontent.com/10999750/41309552-e85ee416-6e33-11e8-8289-bcd25a8356ec.png)

### Front End Features and Images

In the front-end application, the images that appear for the athlete tokens are stored locally. Therefore, it is not an image associated with that specific token it on the blockchain. Rather, the front end renders certain images it has stored locally when it interacts with the token’s information on the blockchain. Thus, the users of the tokens do not own the specific image associated with their athlete. This is not a big issue because the token’s attributes are what make it valuable, not its image. Owners of Cryptokitties have some sort of ownership of their kitten token’s image because each token has a unique DNA attribute that determines its physical appearance. Cryptokitties, however, owns the algorithm that determines what image the DNA corresponds to. The following are snapshots of my frontend application when run locally. This is the view of the user’s athlete token profile after an athlete token is created:

![picture7](https://user-images.githubusercontent.com/10999750/41309593-040ad526-6e34-11e8-9f8d-63a0856c016e.png)

The following is the view of the opposing (fixed enemy athlete token) that the current user can choose to battle with his/her athlete tokens:

![picture8](https://user-images.githubusercontent.com/10999750/41309626-238e86b8-6e34-11e8-841e-db15d32c783a.png)


