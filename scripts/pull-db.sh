# These commands will duplicate R2Db onto your local.
# db.swtor.remove();
# db.copyDatabase("r2db","r2db","localhost:27018","r2db","(-r2-Db-)*-*-*DB");

ssh dev -t -t " ssh -L27018:localhost:27017 coruscant.r2-db.com 'sleep 10; exit'" &

cat copydb.js | ssh dev "sleep 5; mongo"