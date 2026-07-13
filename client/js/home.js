const chats = [

    {
        name:"Manakey",
        last:"こんにちは！"
    },

    {
        name:"Scratch部",
        last:"最新版できた？"
    },

    {
        name:"泉原快速電鉄",
        last:"ダイヤ改正"
    }

];

const list = document.getElementById("chatList");

chats.forEach(chat=>{

    const div=document.createElement("div");

    div.className="chatItem";

    div.innerHTML=`
    <b>${chat.name}</b>
    <br>
    ${chat.last}
    `;

    list.appendChild(div);

});