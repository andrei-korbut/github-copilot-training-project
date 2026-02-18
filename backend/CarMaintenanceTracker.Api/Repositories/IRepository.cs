using System.Linq.Expressions;

namespace CarMaintenanceTracker.Api.Repositories;

/// <summary>
/// Generic repository interface providing base CRUD operations for all entities.
/// </summary>
/// <typeparam name="T">The entity type</typeparam>
public interface IRepository<T> where T : class
{
    /// <summary>
    /// Retrieves an entity by its ID.
    /// </summary>
    /// <param name="id">The entity ID</param>
    /// <param name="includes">Optional navigation properties to include</param>
    /// <returns>The entity if found, null otherwise</returns>
    Task<T?> GetByIdAsync(int id, params Expression<Func<T, object>>[]? includes);

    /// <summary>
    /// Retrieves all entities with optional filtering and ordering.
    /// </summary>
    /// <param name="filter">Optional filter expression</param>
    /// <param name="orderBy">Optional ordering function</param>
    /// <param name="includes">Optional navigation properties to include</param>
    /// <returns>Collection of entities matching the criteria</returns>
    Task<IEnumerable<T>> GetAllAsync(
        Expression<Func<T, bool>>? filter = null,
        Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
        params Expression<Func<T, object>>[]? includes);

    /// <summary>
    /// Adds a new entity to the database.
    /// </summary>
    /// <param name="entity">The entity to add</param>
    /// <returns>The added entity with generated values (e.g., ID)</returns>
    Task<T> AddAsync(T entity);

    /// <summary>
    /// Updates an existing entity in the database.
    /// </summary>
    /// <param name="entity">The entity to update</param>
    /// <returns>The updated entity</returns>
    Task<T> UpdateAsync(T entity);

    /// <summary>
    /// Deletes an entity by its ID.
    /// </summary>
    /// <param name="id">The entity ID to delete</param>
    Task DeleteAsync(int id);
}
