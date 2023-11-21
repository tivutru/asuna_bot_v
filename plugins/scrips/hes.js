module.exports.config = {
    name: "hes",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "bình gei",
    description: "Game bốc bài",
    commandCategory: "Trò Chơi",
    usages: "",
    cooldowns: 1
};
module.exports.run = async ({ Currencies, event, api, Users }) => {
// Tạo một phòng chơi mới
let room = {
    players: [],
    gameStarted: false,
  };
  
  // Hàm thêm người chơi vào phòng
 joinRoom = player
    room.players.push(player);
    api.sendMessage(`${player} đã tham gia phòng`, event.threadID);
   
  // Hàm xóa người chơi khỏi phòng
   leaveRoom = player
    room.players = room.players.filter((p) => p !== player);
    api.sendMessage(`${player} đã rời phòng`, event.threadID);
  
  
  // Hàm bắt đầu trò chơi
   startGame() 
    // Chỉ cho phép bắt đầu khi có 2 người chơi trong phòng
    if (room.players.length !== 2) {
      api.sendMessage("Cần 2 người chơi để bắt đầu", event.threadID);
      return;
    }
  
    room.gameStarted = true;
    api.sendMessage("Trò chơi đã bắt đầu", event.threadID);
  
    // Chia 5 lá bài cho mỗi người chơi
    let cards = ["1", "2", "3", "4", "5", "J"];
    let player1Cards = [];
    let player2Cards = [];
    for (let i = 0; i < 5; i++) {
      player1Cards.push(cards[Math.floor(Math.random() * cards.length)]);
      player2Cards.push(cards[Math.floor(Math.random() * cards.length)]);
    }
  
    // Thực hiện đánh bài
    let turn = 1;
    while (player1Cards.length > 0 && player2Cards.length > 0) {
      let currentPlayer = turn === 1 ? room.players[0] : room.players[1];
      let currentPlayerCards = turn === 1 ? player1Cards : player2Cards;
      let otherPlayerCards = turn === 1 ? player2Cards : player1Cards;
  
      api.sendMessage(`Lượt đánh của ${currentPlayer}`, event.threadID);
      let drawnCard = currentPlayerCards.shift();
      api.sendMessage(`${currentPlayer} bốc được ${drawnCard}`, event.threadID);
  
      if (drawnCard === "J") {
        api.sendMessage(`${currentPlayer} thua cuộc!`, event.threadID);
        api.sendMessage(`${room.players.filter((p) => p !== currentPlayer)} thắng cuộc!`, event.threadID);
      }
    }
}
