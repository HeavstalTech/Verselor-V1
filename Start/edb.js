// Start/edb.js

/**
 * Helper to get or create a user in the local JSON database
 */
async function getUser(userId) {
    // Ensure the economy object exists in the DB
    if (!global.db.data.economy) {
        global.db.data.economy = {};
    }

    // If the user doesn't exist, create a default profile
    if (!global.db.data.economy[userId]) {
        global.db.data.economy[userId] = {
            wallet: 0,
            bank: 0,
            bankCapacity: 1000,
            inventory:[],
            cooldowns: {
                daily: null,
                work: null,
                rob: null
            }
        };
        await global.db.write(); // Save the new user to JSON
    }

    return global.db.data.economy[userId];
}

async function balance(userId) {
    const user = await getUser(userId);
    return {
        wallet: user.wallet,
        bank: user.bank,
        bankCapacity: user.bankCapacity,
    };
}

async function give(userId, amount) {
    const amountNum = Number(amount);
    if (isNaN(amountNum)) return;
    const user = await getUser(userId);
    
    user.wallet += amountNum;
    await global.db.write();
}

async function deduct(userId, amount) {
    const amountNum = Number(amount);
    if (isNaN(amountNum)) return;
    const user = await getUser(userId);
    
    user.wallet -= amountNum;
    await global.db.write();
}

async function daily(userId, defaultAmount = 1001) {
    const user = await getUser(userId);
    const now = Date.now();
    const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours in ms

    if (user.cooldowns.daily && (now - user.cooldowns.daily < cooldownTime)) {
        const timeLeft = cooldownTime - (now - user.cooldowns.daily);
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return { cd: true, cdL: `${hours}h ${minutes}m` };
    }

    user.wallet += defaultAmount;
    user.cooldowns.daily = now;
    await global.db.write();
    
    return { cd: false, amount: defaultAmount };
}

async function deposit(userId, amount) {
    const user = await getUser(userId);
    const amountToDeposit = amount === 'all' ? user.wallet : Number(amount);

    if (isNaN(amountToDeposit) || amountToDeposit <= 0) return { invalid: true };
    if (amountToDeposit > user.wallet) return { noten: true };
    if (user.bank + amountToDeposit > user.bankCapacity) return { noten: true }; // Bank is full

    user.wallet -= amountToDeposit;
    user.bank += amountToDeposit;
    await global.db.write();
    
    return { amount: amountToDeposit };
}

async function withdraw(userId, amount) {
    const user = await getUser(userId);
    const amountToWithdraw = amount === 'all' ? user.bank : Number(amount);

    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) return { invalid: true };
    if (amountToWithdraw > user.bank) return { noten: true };

    user.bank -= amountToWithdraw;
    user.wallet += amountToWithdraw;
    await global.db.write();
    
    return { amount: amountToWithdraw };
}

async function work(userId) {
    const user = await getUser(userId);
    const now = Date.now();
    const cooldownTime = 60 * 60 * 1000; // 1 hour cooldown

    if (user.cooldowns.work && (now - user.cooldowns.work < cooldownTime)) {
        const timeLeft = cooldownTime - (now - user.cooldowns.work);
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        return { cd: true, cdL: `${hours}h ${minutes}m` };
    }

    const amountEarned = Math.floor(Math.random() * 401) + 100; // Between 100 and 500

    user.wallet += amountEarned;
    user.cooldowns.work = now;
    await global.db.write();
    
    return { cd: false, amount: amountEarned, cdL: '1 Hour' };
}

async function rob(robberId, targetId) {
    const robber = await getUser(robberId);
    const target = await getUser(targetId);
    const now = Date.now();
    const cooldownTime = 30 * 60 * 1000; // 30 minutes
    
    if (robber.cooldowns.rob && (now - robber.cooldowns.rob < cooldownTime)) {
        const timeLeft = cooldownTime - (now - robber.cooldowns.rob);
        const minutes = Math.floor(timeLeft / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        return { cd: true, cdL: `${minutes}m ${seconds}s` };
    }
    
    robber.cooldowns.rob = now;
    
    if (target.wallet < 200) {
        await global.db.write();
        return { lowbal: true };
    }

    const successChance = 0.45;
    const success = Math.random() < successChance;

    if (success) {
        const robPercentage = Math.random() * 0.4 + 0.1;
        const amountStolen = Math.floor(target.wallet * robPercentage);

        robber.wallet += amountStolen;
        target.wallet -= amountStolen;
        
        await global.db.write();
        return { success: true, amount: amountStolen };
    } else {
        const finePercentage = Math.random() * 0.1 + 0.05;
        const fineAmount = Math.floor(robber.wallet * finePercentage);
        
        robber.wallet -= fineAmount;
        await global.db.write();
        return { success: false, fine: fineAmount };
    }
}

async function lb(limit = 10) {
    if (!global.db.data.economy) {
        global.db.data.economy = {};
    }

    // Convert the economy object into an array for sorting
    const leaderboardData = Object.entries(global.db.data.economy).map(([userId, data]) => {
        return {
            userId: userId,
            totalWorth: (data.wallet || 0) + (data.bank || 0)
        };
    });

    // Sort by total worth in descending order
    leaderboardData.sort((a, b) => b.totalWorth - a.totalWorth);

    // Return the top `limit` users
    return leaderboardData.slice(0, limit);
}

const SHOP_ITEMS =[
    {
        id: 'bank_upgrade_1',
        name: 'Bank Upgrade Tier 1',
        price: 5000,
        description: 'Increases your bank capacity by ₹10,000.',
        action: (user) => { user.bankCapacity += 10000; }
    },
    {
        id: 'gold_watch',
        name: 'Gold Watch',
        price: 2500,
        description: 'A shiny watch to show off your wealth.',
        action: null
    },
    {
        id: 'fishing_rod',
        name: 'Fishing Rod',
        price: 1000,
        description: 'Unlocks the .fish command to earn extra money.',
        action: null
    }
];

async function getShop() {
    return SHOP_ITEMS;
}

async function buyItem(userId, itemIdentifier) {
    const user = await getUser(userId);
    const shopItems = await getShop();
    
    const itemToBuy = shopItems.find((item, index) => 
        (index + 1).toString() === itemIdentifier || 
        item.name.toLowerCase() === itemIdentifier.toLowerCase()
    );
    
    if (!itemToBuy) {
        return { notfound: true };
    }
    
    if (user.wallet < itemToBuy.price) {
        return { insufficient: true };
    }
    
    user.wallet -= itemToBuy.price;
    
    if (itemToBuy.action) {
        itemToBuy.action(user);
    } else {
        const itemInInventory = user.inventory.find(i => i.name === itemToBuy.name);
        if (itemInInventory) {
            itemInInventory.quantity += 1;
        } else {
            user.inventory.push({
                name: itemToBuy.name,
                quantity: 1,
                description: itemToBuy.description,
            });
        }
    }
    
    await global.db.write();
    return { item: itemToBuy, newBalance: user.wallet };
}

async function getInventory(userId) {
    const user = await getUser(userId);
    return user.inventory || [];
}

const edb = {
    balance,
    daily,
    rob,
    deposit,
    withdraw,
    give,
    lb,
    getInventory,
    getShop,
    buyItem,
    work,
    deduct,
}

export default edb
