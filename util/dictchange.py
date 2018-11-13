def dictfetchall(cursor):
    desc = cursor.description
    return [
        dict(zip([col[0] for col in desc], row))
        for row in cursor.fetchall()
        # for row in cursor.fetchone()
        # for row in cursor.fetchmany()
    ]