from cookbook import models

def showindex():
    try:
        cookbooks=list(models.CookbookIndex.objects.values('title','src'))
        return cookbooks
    except Exception as ex:
        print(ex)
        return []