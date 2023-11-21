module.exports.config = {
    name: "baiJ",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "bình gei",
    description: "Game bốc bài",
    commandCategory: "Trò Chơi",
    usages: "",
    cooldowns: 1
};
module.exports.event = async ({ event, api, client, Users }) => {
    let { senderID, threadID, body } = event;
// Tạo một phòng chơi mới
let room = {
    players: [],
    gameStarted: false,
  };
  
  // Hàm thêm người chơi vào phòng
  function joinRoom(player) {
    room.players.push(player);
    api.sendMessage(`${player} đã tham gia phòng`,event.threadID, event.messageID);
  }
  
  // Hàm xóa người chơi khỏi phòng
  function leaveRoom(player) {
    room.players = room.players.filter((p) => p !== player);
    api.sendMessage(`${player} đã rời phòng`,event.threadID, event.messageID);
  }
  
  // Hàm bắt đầu trò chơi
  function startGame() {
    // Chỉ cho phép bắt đầu khi có 2 người chơi trong phòng
    if (room.players.length !== 2) {
      api.sendMessage("Cần 2 người chơi để bắt đầu",event.threadID, event.messageID);
      return;
    }
  
    room.gameStarted = true;
    api.sendMessage("Trò chơi đã bắt đầu");
  
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
  
      api.sendMessage(`Lượt đánh của ${currentPlayer}`,event.threadID, event.messageID);
      let drawnCard = currentPlayerCards.shift();
      api.sendMessage(`${currentPlayer} bốc được ${drawnCard}`,event.threadID, event.messageID);
  
      if (drawnCard === "J") {
        api.sendMessage(`${currentPlayer} thua cuộc!`);
        api.sendMessage(`${room.players.filter((p) => p !== currentPlayer)} thắng cuộc!`);
      }
    }
}
}