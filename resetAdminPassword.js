require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

// CREDENZIALI UFFICIALI ADMIN
const email = 'info@plusmarket.it';
const newPassword = 'PLUSM1502?';

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('✅ Connesso a MongoDB per reset admin');

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        let admin = await Admin.findOne({ email });

        if (!admin) {
            admin = new Admin({
                email,
                password: hashedPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('✅ Admin creato con successo');
        } else {
            admin.password = hashedPassword;
            await admin.save();
            console.log('✅ Password admin aggiornata con successo');
        }

        console.log(`Email admin: ${email}`);
        console.log(`Nuova password: ${newPassword}`);

        await mongoose.disconnect();
        console.log('🔌 Disconnesso da MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('❌ Errore reset admin:', error);
        process.exit(1);
    }
}

resetAdmin();

