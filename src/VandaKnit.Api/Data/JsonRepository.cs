using System.Xml;
using Newtonsoft.Json;

namespace VandaKnit.Api.Data;

public class JsonRepository<T> where T : class
{
    private readonly string _filePath;

    public JsonRepository(string filePath)
    {
        _filePath = filePath;
        EnsureFileExists();
    }

    private void EnsureFileExists()
    {
        if (!File.Exists(_filePath))
        {
            File.WriteAllText(_filePath, JsonConvert.SerializeObject(new List<T>()));
        }
    }

    private List<T> ReadData()
    {
        var jsonData = File.ReadAllText(_filePath);
        return JsonConvert.DeserializeObject<List<T>>(jsonData) ?? new List<T>();
    }

    private void WriteData(List<T> data)
    {
        var jsonData = JsonConvert.SerializeObject(data, Newtonsoft.Json.Formatting.Indented);
        File.WriteAllText(_filePath, jsonData);
    }

    public IEnumerable<T> GetAll()
    {
        return ReadData();
    }

    public T? FirstOrDefault(Func<T, bool> predicate)
    {
        return ReadData().FirstOrDefault(predicate);
    }

    public void Add(T entity)
    {
        var data = ReadData();
        data.Add(entity);
        WriteData(data);
    }

    public void Update(Predicate<T> predicate, T updatedEntity)
    {
        var data = ReadData();
        var index = data.FindIndex(predicate);

        if (index >= 0)
        {
            data[index] = updatedEntity;
            WriteData(data);
        }
    }

    public void Delete(Func<T, bool> predicate)
    {
        var data = ReadData();
        var itemToRemove = data.FirstOrDefault(predicate);

        if (itemToRemove != null)
        {
            data.Remove(itemToRemove);
            WriteData(data);
        }
    }
}